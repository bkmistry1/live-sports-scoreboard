const express = require('express')
const https = require("node:https");
const router = express.Router()
const dotEnv = require('dotenv').config().parsed

// Replace with your actual access token and API version
const ACCESS_TOKEN = dotEnv.accessToken

const bcsf_client_id = dotEnv.BCSF_YOUTUBE_CLIENT_ID
const bcsf_client_secret = dotEnv.BCSF_YOUTUBE_CLIENT_SECRET
const bcsf_redirect_url = dotEnv.BCSF_YOUTUBE_REDIRECT_URI
// const bcsf_refresh_token = dotEnv.BCSF_YOUTUBE_REFRESH_TOKEN

let bcsf_refresh_token = null

const API_VERSION = 'v25.0'

router.get('/', (req, res) => {
	res.render('partials/new_live_chat', {
		title: 'Live Chat',
		shortcode: 'new_live_chat',
	})
})

// Route to check access token
router.get('/check-token', async (req, res) => {
	try {
		const url = `https://graph.facebook.com/debug_token?input_token=${ACCESS_TOKEN}&access_token=${ACCESS_TOKEN}`
		const result = await makeRequest(url, 'GET')
		return res.json(result)
	} catch (e) {
		return res.status(500).json({ error: e.message })
	}
})

// New route to list live videos
router.get('/list-videos', async (req, res) => {
	try {
		const url = `https://graph.facebook.com/${API_VERSION}/me/live_videos?access_token=${ACCESS_TOKEN}&fields=id,title,status`
		const result = await makeRequest(url, 'GET')
		return res.json(result)
	} catch (e) {
		return res.status(500).json({ error: e.message })
	}
})

// Route to get youtube comments
router.get('/youtube-poll-messages', async (req, res) => {
    // 1. Read query parameters from the client-side request
    const { liveChatId, nextPageToken } = req.query;

    if (!liveChatId) {
        return res.status(400).json({ error: "Missing required liveChatId query parameter." });
    }

    try {
        // 2. Automatically get a fresh access token using your stored refresh token
        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const tokenData = {
            client_id: bcsf_client_id,
            client_secret: bcsf_client_secret,
            refresh_token: bcsf_refresh_token,
            grant_type: 'refresh_token'
        };

        const tokenResponse = await makeRequest(tokenUrl, 'POST', tokenData);
        const accessToken = tokenResponse.access_token;

        // 3. Construct the YouTube Live Chat Messages API URL
        let youtubeUrl = `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails`;
        
        // If the frontend passed a token from the previous poll, append it
        if (nextPageToken) {
            youtubeUrl += `&pageToken=${nextPageToken}`;
        }

        // 4. Fetch the data from YouTube
        const chatData = await makeRequest(youtubeUrl, 'GET', null, accessToken);

        // 5. Structure a clean response for your frontend
        return res.json({
            success: true,
            messages: chatData.items || [],
            nextPageToken: chatData.nextPageToken,
            pollingInterval: chatData.pollingIntervalMillis || 4000 // Fallback to 4s if missing
        });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

router.post('/youtube-chat-id', async (req, res) => {
    const { video_id, access_token } = req.body; 

    if (!video_id || !access_token) {
        return res.status(400).json({ error: "Missing video_id or access_token" });
    }

    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${video_id}`;
        const result = await makeRequest(url, 'GET', null, access_token);
        
        if (!result.items || result.items.length === 0) {
            return res.status(404).json({ success: false, message: "Video not found." });
        }

        const details = result.items[0]?.liveStreamingDetails;
        
        // Fix: Fall back to activeLiveChatId if liveChatId is undefined
        const liveChatId = details?.liveChatId || details?.activeLiveChatId;

        if (!liveChatId) {
            return res.status(404).json({ 
                success: false, 
                message: "No chat ID found inside liveStreamingDetails properties."
            });
        }

        return res.json({ 
            success: true, 
            liveChatId: liveChatId 
        });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// Route to list live videos
router.post('/youtube-live-video', async (req, res) => {
    const body = req.body;
    try {
        // Change parameters to avoid the incompatibility error
        const url = `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,status&broadcastType=all&mine=true`;
        
        const result = await makeRequest(url, 'GET', null, body.access_token);
        
        // Filter the results in memory for the active one
        const activeStream = result.items?.find(item => item.status?.lifeCycleStatus === 'live');

        if (!activeStream) {
            return res.status(404).json({ 
                success: false, 
                message: "No active live stream found on your channel right now." 
            });
        }

        return res.json({
            success: true,
            videoId: activeStream.id,
            title: activeStream.snippet?.title
        });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// refresh youtube token

router.get('/oauth/refresh', async (req, res) => {
	try {

		const url = 'https://oauth2.googleapis.com/token';
		const data = {
			client_id: bcsf_client_id,
			client_secret: bcsf_client_secret,
			refresh_token: bcsf_refresh_token,
			grant_type: 'refresh_token'
		};

		const response = await makeRequest(url, 'POST', data);
		return res.json(response)

	} catch (e) {
		return res.status(500).json({ error: e.message })
	}
})


// google auth

router.get('/oauth', async (req, res) => {
	try {

		const scopes = [
			'https://www.googleapis.com/auth/youtube.readonly',
			'https://www.googleapis.com/auth/youtube.force-ssl'
		];
		
		const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + 
			`client_id=${bcsf_client_id}` +
			`&redirect_uri=${encodeURIComponent(bcsf_redirect_url)}` +
			`&response_type=code` +
			`&scope=${encodeURIComponent(scopes.join(' '))}` +
			`&access_type=offline` + 
			`&prompt=consent`;

		res.redirect(authUrl);

		// return res.json(result)
	} catch (e) {
		return res.status(500).json({ error: e.message })
	}
})

// oauth callback

router.get('/oauth2callback', async (req, res) => {
	const code = req.query.code;
	if (!code) return res.status(400).send('Authorization code missing.');

	try {
		const tokenResponse = await makeRequest(
			'https://oauth2.googleapis.com/token',
			'POST',
			{
				code: code,
				client_id: bcsf_client_id,
				client_secret: bcsf_client_secret,
				redirect_uri: bcsf_redirect_url,
				grant_type: 'authorization_code'
			}
		);

		// Capture both critical tokens
		const accessToken = tokenResponse.access_token;
		const refreshToken = tokenResponse.refresh_token;

		console.log("🚀 Access Token acquired!");
		console.log("💾 Refresh Token acquired (Save this securely):", refreshToken);

		bcsf_refresh_token = refreshToken

		res.send('Authenticated successfully! Check your server terminal window.');
		
		// Next step will go here: kick off tracking a live stream video
		// startLiveChatTracking(accessToken, 'YOUR_VIDEO_ID');

	} catch (error) {
		res.status(500).send('Token Exchange Failed: ' + error.message);
	}
})

router.get('/', async (req, res) => {
	res.render('partials/live_chat', {
		title: 'Live Chat',
		shortcode: 'live_chat',
		// videoId: req.params.id,
	})
})

router.get('/:id', async (req, res) => {
	res.render('partials/live_chat', {
		title: 'Live Chat',
		shortcode: 'live_chat',
		videoId: req.params.id,
	})
})


// Route to get live video details
router.get('/:id/comments', async (req, res) => {
	try {
		const url = `https://graph.facebook.com/${req.params.id}/comments?access_token=${ACCESS_TOKEN}&fields=from{id,name,picture},message,created_time`
		const result = await makeRequest(url, 'GET')
		return res.json(result)
	} catch (e) {
		if (
			e.message.includes("Object with ID") &&
			e.message.includes("does not exist")
		) {
			return res
				.status(404)
				.json({ error: "Live video not found. Please check the ID." });
		}
		if (e.message.includes("missing permissions")) {
			return res
				.status(403)
				.json({
					error: "Insufficient permissions. Please check your access token.",
				});
		}
			return res.status(500).json({ error: e.message });
	}
})

// Helper function to make HTTPS requests
function makeRequest(url, method, data = null, accessToken = null) {
	return new Promise((resolve, reject) => {
		// const urlObj = new URL(url);

		const options = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
		}

		if (accessToken) {
            options.headers['Authorization'] = `Bearer ${accessToken}`;
        }		

		const req = https.request(url, options, res => {
			let body = ''
			res.on('data', chunk => (body += chunk.toString()))
			res.on('end', () => {
				const response = JSON.parse(body)
				if (response.error) {
					reject(new Error(response.error.message))
				} else {
					resolve(response)
				}
			})
		})

		req.on('error', error => reject(error))

		if (data) {
			req.write(JSON.stringify(data))
		}
		req.end()
	})
}

// Route to check access token
router.get('/check-token', async (req, res) => {
	try {
		const url = `https://graph.facebook.com/debug_token?input_token=${ACCESS_TOKEN}&access_token=${ACCESS_TOKEN}`
		const result = await makeRequest(url, 'GET')
		return res.json(result)
	} catch (e) {
		return res.status(500).json({ error: e.message })
	}
})

// Route to get live video details
router.get('/:id/comments', async (req, res) => {
	try {
		const url = `https://graph.facebook.com/${req.params.id}/comments?access_token=${ACCESS_TOKEN}&fields=from{id,name,picture},message,created_time`
		const result = await makeRequest(url, 'GET')
		return res.json(result)
	} catch (e) {
		if (
			e.message.includes("Object with ID") &&
			e.message.includes("does not exist")
		) {
			return res
				.status(404)
				.json({ error: "Live video not found. Please check the ID." });
		}
		if (e.message.includes("missing permissions")) {
			return res
				.status(403)
				.json({
					error: "Insufficient permissions. Please check your access token.",
				});
		}
			return res.status(500).json({ error: e.message });
	}
})

// New route to list live videos
router.get('/list-videos', async (req, res) => {
	try {
		const url = ``
		const result = await makeRequest(url, 'GET')
		return res.json(result)
	} catch (e) {
		return res.status(500).json({ error: e.message })
	}
})

module.exports = router

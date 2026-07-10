(($) => {
let currentNextPageToken = '';
let targetChatId = '';
let access_token = '';
let video_id = '';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


async function getYoutubeLiveChatId() {

	while(video_id.length < 1) {
		await sleep(2000)
	}

    try {
        const response = await fetch(`/live_chat/youtube-chat-id`, {
            method: 'POST', // 1. Must be POST to send a body
            headers: {
                'Content-Type': 'application/json' // 2. Tell the server to expect JSON
            },
            body: JSON.stringify({
                video_id: video_id,     // 3. Pass your variables here
                access_token: access_token
            })
        });

        const data = await response.json();
        targetChatId = data["liveChatId"]
        // return data; // Return the parsed data (which contains your liveChatId)

    } catch (error) {
        console.error("Error fetching live chat ID:", error);
    }
}

async function getYoutubeAccessToken() {

	const response = await fetch(`/live_chat/oauth/refresh`);
	const responseJson = await response.json()
	access_token = responseJson["access_token"];
	console.log(access_token)
}

async function getYoutubeVideoId() {

	while(access_token.length < 1) {
        console.log("waiting")
		await sleep(2000)
	}

    try {
        const response = await fetch(`/live_chat/youtube-live-video`, {
            method: 'POST', // 1. Must be POST to send a body
            headers: {
                'Content-Type': 'application/json' // 2. Tell the server to expect JSON
            },
            body: JSON.stringify({
                access_token: access_token
            })
        });

		responseJson = await response.json()
		video_id=responseJson["videoId"]
        console.log(video_id)

    } catch (error) {
        console.error("Error fetching live chat ID:", error);
    }

}

async function startClientPolling() {
    try {
        // Hit your backend route, passing the Chat ID and the latest page token
        const response = await fetch(`/live_chat/youtube-poll-messages?liveChatId=${targetChatId}&nextPageToken=${currentNextPageToken}`);
        const data = await response.json();

        if (data.success) {
            // 1. Process your new messages array here!
            data.messages.forEach(msg => {
                console.log(`${msg.authorDetails.displayName}: ${msg.snippet.displayMessage}`);
            });

            // 2. Save the token for the NEXT request so you don't get duplicate messages
            currentNextPageToken = data.nextPageToken;

            // 3. Wait exactly the amount of time YouTube requested, then poll again
            setTimeout(startClientPolling, data.pollingInterval);
        } else {
            console.error("Server returned an error, retrying in 5s...", data.error);
            setTimeout(startClientPolling, 5000);
        }
    } catch (err) {
        console.error("Network error, retrying in 5s...", err);
        setTimeout(startClientPolling, 5000);
    }
}

// Start the loop when you are ready
getYoutubeAccessToken()
getYoutubeVideoId()
getYoutubeLiveChatId()
startClientPolling();
})(window.jQuery);

const express = require('express')
const https = require('https')
const router = express.Router()
const dotEnv = require('dotenv').config().parsed

// Replace with your actual access token and API version
const ACCESS_TOKEN = dotEnv.accessToken
const API_VERSION = 'v20.0'

// Helper function to make HTTPS requests
function makeRequest(url, method, data = null) {
	return new Promise((resolve, reject) => {
		const options = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
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
router.get('/live-video/:id', async (req, res) => {
	try {
		const url = `https://graph.facebook.com/${req.params.id}/comments?access_token=${ACCESS_TOKEN}`
		const result = await makeRequest(url, 'GET')
		return res.json(result)
	} catch (e) {
		if (e.message.includes('Object with ID') && e.message.includes('does not exist')) {
			return res.status(404).json({ error: 'Live video not found. Please check the ID.' })
		} else if (e.message.includes('missing permissions')) {
			return res
				.status(403)
				.json({ error: 'Insufficient permissions. Please check your access token.' })
		} else {
			return res.status(500).json({ error: e.message })
		}
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

module.exports = router

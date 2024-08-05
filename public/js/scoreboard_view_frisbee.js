;(function ($) {
	const socket = io()

	socket.on('score_frisbee', scoreObj => {
		let frisbeeScore1 = $('#frisbeeScore1')
		let frisbeeScore2 = $('#frisbeeScore2')

		frisbeeScore1.val(scoreObj.frisbeeTeam1)
		frisbeeScore2.val(scoreObj.frisbeeTeam2)
	})

	socket.on('teamNameUpdate', data => {
		let frisTeam = $(`#${data.id}`)

		frisTeam.val(data.value)
	})

	socket.on('updateHeader', data => {
		const frisbeeHeader = $(`#${data.id}`)

		frisbeeHeader.val(data.value)
	})

	socket.on('teamScoreUpdate', data => {
		let frisbeeScore = $(`#${data.id}`)

		frisbeeScore.val(data.value)
	})

	// Fetch live chats and update the DOM
	async function fetchLiveChats(videoId) {
		try {
			console.log('Here')
			const response = await fetch(`/live-chat/${videoId}`)
			const data = await response.json()
			const liveChatList = $('#liveChatList')
			liveChatList.empty()
			data.data.forEach(chat => {
				liveChatList.append(`<li>${chat.message}</li>`)
			})
		} catch (error) {
			console.error('Error fetching live chats:', error)
		}
	}

	// Replace 'VIDEO_ID' with the actual video ID you want to fetch comments for
	const videoId = 7919230081499844
	fetchLiveChats(videoId)

	// Fetch live chats every 5 seconds
	setInterval(() => fetchLiveChats(videoId), 5000)
})(window.jQuery)

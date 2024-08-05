;(function ($) {
	// Fetch live chats and update the DOM
	async function fetchLiveChats() {
		try {
			const videoId = window.videoId
			console.log(videoId)
			const response = await fetch(`/live_chat/${videoId}/comments`)
			const data = await response.json()
			const liveChatList = $('#liveChatList')
			liveChatList.empty()
			console.log(data)
			data.data.forEach(chat => {
				liveChatList.append(`
                <li>
                    <div class="chat-message">${chat.message}</div>
                </li>
            `)
			})
		} catch (error) {
			console.error('Error fetching live chats:', error)
		}
	}

	fetchLiveChats()

	// Fetch live chats every 10 seconds
	setInterval(() => fetchLiveChats(videoId), 10000)
})(window.jQuery)

(($) => {
	// Fetch live chats and update the DOM
	async function fetchLiveChats() {
		try {
			// Fetch comments from facebook 
			const videoResponse = await fetch(`/live_chat/list-videos`);
			const videoData = await videoResponse.json();
			const videoId = videoData.data.length > 0 ? videoData.data[0].id : null;
			console.log("Fetched video ID:", videoId);
			if (!videoId) {
				console.error("No live videos found.");
				return;
			}
			const response = await fetch(`/live_chat/${videoId}/comments`);
			const data = await response.json();
			const liveChatList = $("#liveChatList");
			liveChatList.empty();
			console.log(data);
			for (const chat of data.data) {
				const avatarUrl = chat.from?.picture?.data?.url || null;
				const authorName = chat.from?.name || 'Unknown';
				liveChatList.append(`
					<li>
						<div class="chat-item">
							${avatarUrl ? `<img class="chat-avatar" src="${avatarUrl}" alt="${authorName}">` : ''}
							<div class="chat-body">
								<div class="chat-meta">
									<span class="chat-author fb-chat">${authorName}: </span>
									<span class="chat-message">${chat.message}</span>
								</div>
							</div>
						</div>
					</li>
				`);
			}

			// Scroll to the newest message
			liveChatList[0].scrollTop = liveChatList[0].scrollHeight;
		} catch (error) {
			console.error("Error fetching live chats:", error);
		}
	}

	fetchLiveChats();

	// Fetch live chats every 10 seconds
	setInterval(fetchLiveChats, 10000);
})(window.jQuery);

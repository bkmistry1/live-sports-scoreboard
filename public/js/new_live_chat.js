(async ($) => {
	const baseUrl = window.location.origin;
	const socket = io();
	const liveChatContainer = $("#liveChatContainer");
	const liveChatList = $("#liveChatList");
	let youtubeState = {
		chatId: null,
		initialized: false
	};
	let lastTimeStamp = 0;
	
	socket.on("live_chat_update", (chatObj) => {
		console.log("Received live chat update:", chatObj);
		if (chatObj?.compact !== null && chatObj?.compact !== undefined) {
			if (chatObj.compact) {
				liveChatContainer.addClass("chat-compact-view"); 
			} else {
				liveChatContainer.removeClass("chat-compact-view");
			}
		}
		if (chatObj?.visible !== null && chatObj?.visible !== undefined) {
			if (chatObj.visible) {
				liveChatContainer.show();
			} else {
				liveChatContainer.hide();
			}
		}
		if (chatObj?.bottom !== null && chatObj?.bottom !== undefined) {
			liveChatContainer.css("bottom", chatObj.bottom + "px");
		}
		if (chatObj?.right !== null && chatObj?.right !== undefined) {
			liveChatContainer.css("right", chatObj.right + "px");
		}
		if (liveChatList[0]) {
			liveChatList[0].scrollTop = liveChatList[0].scrollHeight;
		}
	});

	// Initialize YouTube chat ID (one-time setup)
	async function initializeYoutube() {
		try {
			const accessToken = await getYoutubeAccessToken();
			const videoId = await getYoutubeVideoId(accessToken);
			youtubeState.chatId = await getYoutubeLiveChatId(videoId, accessToken);
			youtubeState.initialized = true;
			console.log("YouTube chat ID initialized:", youtubeState.chatId);
		} catch (error) {
			console.error("YouTube initialization failed:", error);
		}
	}

	// Fetch Facebook messages
	async function fetchFacebookChats() {
		try {
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


			return (data.data || []).map(chat => ({
				author: chat.from?.name || 'Unknown',
				text: chat.message,
				timestamp: new Date(chat.created_time).getTime(),
				source: 'facebook',
				avatar: chat.from?.picture?.data?.url || null,
				className: 'fb-chat'
			}));
		} catch (error) {
			console.error("Error fetching Facebook chats:", error);
			return [];
		}
	}

	// Fetch YouTube messages
	async function fetchYoutubeChats() {
		if (!youtubeState.initialized) return [];

		try {
			const url = `/live_chat/youtube-poll-messages?liveChatId=${youtubeState.chatId}`;
			const response = await fetch(url);
			const data = await response.json();

			if (!data.success) {
				console.error("YouTube poll error:", data.error);
				return [];
			}

			return (data.messages || []).map(chat => ({
				author: chat.authorDetails?.displayName ? (chat.authorDetails.displayName[0] === '@' ? chat.authorDetails.displayName.slice(1) : chat.authorDetails.displayName) : 'Unknown',
				text: chat.snippet?.displayMessage || '',
				timestamp: new Date(chat.snippet?.publishedAt).getTime(),
				source: 'youtube',
				avatar: chat.authorDetails?.profileImageUrl || null,
				className: 'yt-chat'
			}));
		} catch (error) {
			console.error("Error fetching YouTube chats:", error);
			return [];
		}
	}

	// Combine and sort messages by timestamp
	function combineAndSort(facebookMessages, youtubeMessages) {
		const combined = [...facebookMessages, ...youtubeMessages];
		return combined.sort((a, b) => a.timestamp - b.timestamp);
	}

	// Render all chats to DOM
	function renderChats(messages) {
		const liveChatList = $("#liveChatList");
		liveChatList.empty();

		let totalDelay = 0;
		messages.forEach(chat => {
			// delay new messages from 0 to 1 second
			const timeDiff = Math.max(0, chat.timestamp - lastTimeStamp);
			const delay = timeDiff === 0 ? 0 : Math.min(Math.max(timeDiff / 10, 100), 1000);
			totalDelay += delay;

			setTimeout(function() {
				liveChatList.append(`
					<li>
						<div class="chat-item">
							${chat.avatar ? `<img class="chat-avatar" src="${chat.avatar}" alt="${chat.author}">` : ''}
							<div class="chat-body">
								<div class="chat-meta">
									<span class="chat-author ${chat.className}">${chat.author}: </span>
									<span class="chat-message">${chat.text}</span>
								</div>
							</div>
						</div>
					</li>
				`);

				// Auto-scroll to newest messages (at bottom)
				if (liveChatList[0]) {
					liveChatList[0].scrollTop = liveChatList[0].scrollHeight;
				}
			}, totalDelay);
			lastTimeStamp = Math.max(lastTimeStamp, chat.timestamp);
		});
	}

	// Main unified polling function
	async function pollUnifiedChat() {
		// Commenting out facebook for now
		// const [facebookMessages, youtubeMessages] = await Promise.all([
		// 	fetchFacebookChats(),
		// 	fetchYoutubeChats()
		// ]);

		// const allMessages = combineAndSort(facebookMessages, youtubeMessages);
		// renderChats(allMessages);
		const msg = await fetchYoutubeChats();
		renderChats(msg);
	}

	// YouTube helper functions
	async function getYoutubeAccessToken() {
		const response = await fetch(`/live_chat/oauth/refresh`);
		const data = await response.json();
		return data.access_token;
	}

	async function getYoutubeVideoId(accessToken) {
		const response = await fetch(`/live_chat/youtube-live-video`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ access_token: accessToken })
		});
		const data = await response.json();
		return data.videoId;
	}

	async function getYoutubeLiveChatId(videoId, accessToken) {
		const response = await fetch(`/live_chat/youtube-chat-id`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ video_id: videoId, access_token: accessToken })
		});
		const data = await response.json();
		return data.liveChatId;
	}

	// Initialize and start polling
	try {
		await initializeYoutube();
		console.log("Chat system initialized. Starting unified polling...");
		
		// Fetch immediately on page load
		await pollUnifiedChat();

		// Poll every 30 seconds
		setInterval(pollUnifiedChat, 30000);
	} catch (error) {
		console.error("Chat system startup failed:", error);
	}

})(window.jQuery);

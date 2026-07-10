(async () => {
    let currentNextPageToken = '';
    let pollingInterval = 15000

    // Utility to pause execution
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // 1. Get Access Token
    async function getYoutubeAccessToken() {
        const response = await fetch(`/live_chat/oauth/refresh`);
        const data = await response.json();
        return data.access_token;
    }

    // 2. Get Video ID (requires access token)
    async function getYoutubeVideoId(accessToken) {
        const response = await fetch(`/live_chat/youtube-live-video`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ access_token: accessToken })
        });
        const data = await response.json();
        return data.videoId;
    }

    // 3. Get Live Chat ID (requires video ID and access token)
    async function getYoutubeLiveChatId(videoId, accessToken) {
        const response = await fetch(`/live_chat/youtube-chat-id`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ video_id: videoId, access_token: accessToken })
        });
        const data = await response.json();
        return data.liveChatId;
    }

    // 4. Poll messages recursively
    async function startClientPolling(chatId) {
        try {
            const url = `/live_chat/youtube-poll-messages?liveChatId=${chatId}&nextPageToken=${currentNextPageToken}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.success) {
                const liveChatList = $("#liveChatList");

                // Process messages
                data.messages.forEach(chat => {
                    // console.log(`${chat.authorDetails.displayName}: ${chat.snippet.displayMessage}`);
                    const avatarUrl = chat.authorDetails?.profileImageUrl || null;
                    const authorName = chat.authorDetails?.displayName || 'Unknown';
                    liveChatList.append(`
                            <li>
                                <div class="chat-item">
                                    ${avatarUrl ? `<img class="chat-avatar" src="${avatarUrl}" alt="${authorName}">` : ''}
                                    <div class="chat-body">
                                        <div class="chat-yt">
                                            <span class="chat-author yt-chat">${authorName}: </span>
                                            <span class="chat-message">${chat.snippet.displayMessage}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>                        
                        `);                    
                });

                // Update token for next iteration
                currentNextPageToken = data.nextPageToken;

                // Poll again after the server's recommended interval                
                if(data.pollingInterval > 15000) {
                    pollingInterval = data.pollingInterval
                }
                setTimeout(() => startClientPolling(chatId), pollingInterval);
            } else {
                console.error("Server error, retrying in 15s...", data.error);
                setTimeout(() => startClientPolling(chatId), 15000);
            }
        } catch (err) {
            console.error("Network error, retrying in 15s...", err);
            setTimeout(() => startClientPolling(chatId), 15000);
        }
    }

    // --- Main Orchestration ---
    try {
        const accessToken = await getYoutubeAccessToken();
        const videoId = await getYoutubeVideoId(accessToken);
        const chatId = await getYoutubeLiveChatId(videoId, accessToken);

        console.log("Initialization successful. Starting chat polling...");
        startClientPolling(chatId);
    } catch (error) {
        console.error("Initialization failed:", error);
    }
})();
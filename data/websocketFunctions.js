const http = require('https')
var websocket = require('ws')

let exportedMethods = {

	async getDirectorList() {
		let finalData = null
		var ws = new websocket('ws://192.168.1.120:8887/remote/controller/authenticate')

		ws.on('open', () => {
			console.log('Connected to WebSocket server');
			var wss = new websocket('ws://192.168.1.120:8887/remote/controller/getDirectorList')

			wss.on('open', () => {
				console.log('Connected to WebSocket server');
			  });
			  
			wss.on('message', data => {
				console.log('Received:', data.toString());
				finalData = JSON.parse(data.toString())
			});
			
			wss.on('close', () => {
				console.log('Disconnected from WebSocket server');
			});
			
			wss.on('error', error => {
				console.error('WebSocket error:', error);
			});		
			
		  });
		  
		ws.on('message', asdf => {
			console.log('Received:', asdf.toString());
		});
		  
		ws.on('close', () => {
			console.log('Disconnected from WebSocket server');
		});
		
		ws.on('error', error => {
			console.error('WebSocket error:', error);
		});		

        while(finalData == null) {
            await this.sleep(3000)
            console.log("timeout")            
        }

        ws.close()

        return finalData;
	},

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }    


    
};

module.exports = exportedMethods;
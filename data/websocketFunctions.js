const http = require('http')
var websocket = require('ws')
const url = require('url')
const yoloboxIp = "192.168.1.117"


let exportedMethods = {

    async getDirectorList() {
      let finalData = null
      var ws = new websocket('ws://'+yoloboxIp+':8887/remote/controller/authenticate')

      ws.on('open', () => {
        console.log('Connected to WebSocket server');
        var wss = new websocket('ws://'+yoloboxIp+':8887/remote/controller/getDirectorList')

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

          let timeoutCount = 0
          while(finalData == null) {
              await this.sleep(1000)
              // console.log("timeout")
              timeoutCount++
              if(timeoutCount > 15) {
                  console.log("timed Out")
                  return
              }
          }

          videoSources = finalData["data"]["result"]
          await this.registerButtonsForCompanion(videoSources)

          ws.close()

          return;
    },

    async getMaterialList() {
      let finalData = null
      var ws = new websocket('ws://'+yoloboxIp+':8887/remote/controller/authenticate')

      ws.on('open', () => {
        console.log('Connected to WebSocket server');
        var wss = new websocket('ws://'+yoloboxIp+':8887/remote/controller/getMaterialList')

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

          let timeoutCount = 0
          while(finalData == null) {
              await this.sleep(1000)
              // console.log("timeout")
              timeoutCount++
              if(timeoutCount > 15) {
                  console.log("timed Out")
                  return
              }
          }

          materialSources = finalData["data"]["result"]
          await this.registerButtonsForCompanionMaterial(materialSources)

          ws.close()

          return;
    },    

    async getMixerList() {
      let finalData = null
      var ws = new websocket('ws://'+yoloboxIp+':8887/remote/controller/authenticate')

      ws.on('open', () => {
        console.log('Connected to WebSocket server');
        var wss = new websocket('ws://'+yoloboxIp+':8887/remote/controller/getMixerList')

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

          let timeoutCount = 0
          while(finalData == null) {
              await this.sleep(1000)
              // console.log("timeout")
              timeoutCount++
              if(timeoutCount > 15) {
                  console.log("timed Out")
                  return
              }
          }

          mixerSources = finalData["data"]["result"]
          await this.registerButtonsForCompanionMaterial(mixerSources)

          ws.close()

          return;
    },       

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    async registerButtonsForCompanion(directorListData) {

        index = 0;
        
        for(let i=0; i<directorListData.length; i++) {
            buttonValue = directorListData[i]["directorName"]
            idValue = directorListData[i]["id"]
            index++;

            const params = {
                value: buttonValue,
            }

            const urlWithParams = url.format({
                pathname: "/api/custom-variable/button"+index+"/value",
                query: params,
            })

            await this.postRequestForCustomVariableButtons(urlWithParams)

            const params2 = {
                value: idValue,
            }

            const urlWithParams2 = url.format({
                pathname: "/api/custom-variable/id"+index+"/value",
                query: params2,
            })            
            
            await this.postRequestForCustomVariableButtons(urlWithParams2)
        }

        return
    },

    async registerButtonsForCompanionMaterial(materialSources) {

      index = 8;
      
      for(let i=0; i<materialSources.length; i++) {
          buttonValue = materialSources[i]["id"]
          idValue = materialSources[i]["id"]
          index++;

          const params = {
              value: buttonValue,
          }

          const urlWithParams = url.format({
              pathname: "/api/custom-variable/button"+index+"/value",
              query: params,
          })

          await this.postRequestForCustomVariableButtons(urlWithParams)

          const params2 = {
              value: idValue,
          }

          const urlWithParams2 = url.format({
              pathname: "/api/custom-variable/id"+index+"/value",
              query: params2,
          })            
          
          await this.postRequestForCustomVariableButtons(urlWithParams2)
      }

      return
    },

    async registerButtonsForCompanionMaterial(materialSources) {

      index = 0;
      
      for(let i=0; i<materialSources.length; i++) {
          buttonValue = materialSources[i]["mixerName"]
          idValue = materialSources[i]["id"]
          index++;

          const params = {
              value: buttonValue,
          }

          const urlWithParams = url.format({
              pathname: "/api/custom-variable/soundBtn"+index+"/value",
              query: params,
          })

          await this.postRequestForCustomVariableButtons(urlWithParams)

          const params2 = {
              value: idValue,
          }

          const urlWithParams2 = url.format({
              pathname: "/api/custom-variable/soundId"+index+"/value",
              query: params2,
          })            
          
          await this.postRequestForCustomVariableButtons(urlWithParams2)
      }

      return
    },    

    async postRequestForCustomVariableButtons(urlWithParams) {
        let path = urlWithParams
              
        const options = {
          hostname: '127.0.0.1',
          port: 8000,
          path: path,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        };
        
        const req = http.request(options, res => {
          let responseData = '';
          res.on('data', chunk => {
            responseData += chunk;
          });              
        });
        
        req.on('error', error => {
          console.error(error);
        });
        
        req.end();        
    }

};

module.exports = exportedMethods;
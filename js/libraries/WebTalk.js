var WebTalk = {
	DEBUG:true,
	socket:null,
	socketData:{
		connected:null,
		connectedToRoom:"global",
		helpers:{
			roomChanged:false
		}
	},
	getData:null,
	get:function(file){
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", file);
		rawFile.send();
		rawFile.onload = function(){
			if(rawFile.status == 200){
				WebTalk.getData = rawFile.responceText;
			} else {
				WebTalk.getData = "[WebTalk.getData] 404";
			}
		}
		rawFile.onerror = function(){
			WebTalk.getData = "[WebTalk.getData] 404";
		}
		return new Promise((resolve, reject) => {
			whenNotEquals("WebTalk.getData", "null", () => {
				var data = WebTalk.getData;
				WebTalk.getData = null;
				resolve(data);
			});
		});
	},
	loadImage:function(key, src){
		return new Promise((resolve, reject) => {
			var image = new Image();
			image.src = src;
			image.onload = function(){
				if(typeof(Log) != undefined && WebTalk.DEBUG == true){
					Log.debugLog("Loaded Image '" + key + "' from '" + src + "'");
				}
				if(typeof(LoadedImages) != undefined && WebTalk.DEBUG == true){
					LoadedImages.setImage(key, image);
				}
				resolve(image);
			}
			image.onerror = function(){
				reject("Image Could Not Be Obtained");
			}
		});
	},
	loadScript:function(src){
		return new Promise((resolve, reject) =>{
			var file = document.createElement("script");
			file.setAttribute("src", src);
			document.getElementsByTagName("body")[0].appendChild(file);
			file.onload = function(){
				resolve(200);
			}
			file.onerror = function(err){
				reject(err);
			}
		});
	},
	createConnection:async function(){
		WebTalk.socket = await io();
		await WebTalk.bindSocketOnEvents();
		await WebTalk.connectTo(WebTalk.socketData.connectedToRoom);
	},
	connectAs:function(name){

	},
	connectTo:function(room){
		WebTalk.socket.emit("CONNECT_TO_ROOM", room);
		return new Promise((resolve) => {
			whenNotEquals("WebTalk.socketData.helpers.roomChanged", "false", () => {
				WebTalk.socketData.helpers.roomChanged = false;
				resolve(200);
			});
		});
	},
	bindSocketOnEvents:function(){
		var soc = WebTalk.socket;
		soc.on("connect", async () => {
			if(WebTalk.socketData.connected == false){
				await WebTalk._onSocketReconnect();
			}
		});
		soc.on("disconnect", () => {
			WebTalk.socketData.connected = false;
		});
		soc.on("CONNECTED_TO_ROOM", (room) => {
			WebTalk.socketData.connectedToRoom = room;
			WebTalk.socketData.helpers.roomChanged = true;
		});
	},
	_onSocketReconnect:async function(){
		WebTalk.socketData.connected = true;
		await WebTalk.connectTo(WebTalk.socketData.connectedToRoom);
	}
}

function loadImage(dir, key, callback){
	var image = new Image();
	image.src = dir;
	LoadedImages[key] = image;
	image.onload = function(){
		webTalkDebugLogging("Loaded Image (" + dir + ") as '" + key + "'");
		callback();
	}
}

function loadAudio(dir, key, callback){
	var audio = new Audio(dir);
	audio.setAttribute("id", key);
	audio.setAttribute("src", dir);
	audio.setAttribute("allow", "autoplay");
	audio.autoplay = true;
	audio.setAttribute("volume", "1.0");
	LoadedAudio[key] = audio;
	audio.oncanplaythrough = function(){
		webTalkDebugLogging("Loaded Audio (" + dir + ") as '" + key + "'");
		audio.load();
		callback();
		audio.oncanplaythrough = null;
	};
	document.getElementsByTagName("head")[0].appendChild(audio);
}

function playAudio(key, callback, onstart){
	LoadedAudio[key].play();
	LoadedAudio[key].onplay = function(){
		if(onstart){
			LoadedAudio[key].onplay = null;
			LoadedAudio[key].onended = null;
			callback();
		}
	}
	LoadedAudio[key].onended = function(){
		if(!onstart){
			LoadedAudio[key].onplay = null;
			LoadedAudio[key].onended = null;
			callback();
		}
	}
}

function loadFont(dir, callback){
	var font = document.createElement("link");
	font.setAttribute("rel", "stylesheet");
	font.setAttribute("href", dir);
	font.onload = function(){
		webTalkDebugLogging("Loaded Font (" + dir + ")");
		callback();
	};
	document.getElementsByTagName("head")[0].appendChild(font);
}

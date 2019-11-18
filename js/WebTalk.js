var WebTalk = {
	config:{
		debug:true,
		version:"1.0.0"
	},
	readFileOnline:function(file){
		return new Promise((resolve) => {
			var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, true);
	    rawFile.onreadystatechange = function(){
				if(rawFile.readyState == 4 && rawFile.status == "200"){
					resolve(rawFile.responseText);
				}
	    }
	    rawFile.send(null);
		});
	}
}
/*
function readFileOnline(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function(){
		if (rawFile.readyState == 4 && rawFile.status == "200"){
			webTalkDebugLogging("Read Online File (" + file + ")");
			callback(rawFile.responseText);
		}
    }
    rawFile.send(null);
}*/

function loadScript(dir, callback){
	var file = document.createElement("script");
	file.setAttribute("type", "text/javascript");
	file.setAttribute("src", dir);
	file.onload = function(){
		webTalkDebugLogging("Loaded Script (" + dir + ")");
		callback();
	};
	document.getElementsByTagName("head")[0].appendChild(file);
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

class SockConnection{
	constructor(room){
		var obj = this;
		this.soc = io();
		SocketConnected = true;
		webTalkDebugLogging("Created New Socket");
		this.soc.on("disconnect", function(){
			SocketConnected = false;
		});
		if(room != undefined){
			this.soc.room = room;
			this.soc.emit("SocketJoinRoom", room);
			this.soc.on("SocketJoinedRoom", function(){
				webTalkDebugLogging("Added Socket To Room (" + room + ")");
			});
		}
		this.soc.requestData = function(data){
			obj.requestData(data);
		}
		this.soc.setData = function(data, val){
			obj.setData(data, val);
		}
		this.soc.toMirror = function(msg, data){
			obj.toMirror(msg, data);
		}
		webTalkDebugLogging("Socket Ready For Use");
		return this.soc;
	}
	requestData(data){
		if(data == undefined){
			data = "SENDALLDATA";
		}
		this.soc.emit("SocketRequestingData", data);
		webTalkDebugLogging("Socket Requesting Data (" + data + ")");
	}
	setData(data, val){
		this.soc.emit("SocketSetData", data, val);
		webTalkDebugLogging("Socket Setting Data (" + data + ") To (" + val + ")");
	}
	toMirror(msg, data){
		if(data == undefined){
			this.soc.emit("sendToMirror", msg);
			webTalkDebugLogging("Socket Sending Message (" + msg + ") To Mirror");
		} else {
			this.soc.emit("sendToMirror", msg, data);
			webTalkDebugLogging("Socket Sending Message (" + msg + ") To Mirror With Data (" + data + ")");
		}
	}
	toController(msg, data){
		if(data == undefined){
			this.soc.emit("sendToController", msg);
			webTalkDebugLogging("Socket Sending Message (" + msg + ") To Controller");
		} else {
			this.soc.emit("sendToController", msg, data);
			webTalkDebugLogging("Socket Sending Message (" + msg + ") To Controller With Data (" + data + ")");
		}
	}
}

function webTalkDebugLogging(message){
	if(WebTalk.config.debug){
		console.log("%c[WebTalk - Version " + WebTalk.config.version + "] " + message, "color:#FF00FF");
	}
}

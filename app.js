var express = require("express");
const fs = require("fs");
var os = require("os");
var app = express();
var serv = require("http").Server(app);
var io = require("socket.io")(serv,{});
var port = process.env.PORT || 52470;
app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/index.html");
});
app.use("/public", express.static(__dirname + "/public"));
serv.listen(port);
if(port != process.env.PORT){
	var __ConnectTo__ = os.networkInterfaces()["Wi-Fi"][1].address + ":" + port;
	console.clear();
	console.log("--> Webpage Started On } " + __ConnectTo__);
}

var connections = {};

io.on("connection", function(socket){

	connections[socket.id] = new Connection(socket);

	socket.emit("connected_to_server");

	socket.on("disconnect", () => {
		delete connections[socket.id];
	});

});

function Connection(socket){
	this.socket = socket;
	this.socketId = socket.id;
}

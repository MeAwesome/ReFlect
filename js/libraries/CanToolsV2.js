var CanTools = {
	config:{
		debug:true,
		superdebug:false,
		version:"2.0.0"
	},
	Canvas:function(id, width, height){
		var canvas = document.createElement("canvas");
		canvas.setAttribute("id", id);
		document.body.append(canvas);
		return new Canvas(canvas, width, height);
	}
}

class Canvas{
	constructor(canvas, width, height){
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		this.width = width;
		this.height = height;
		canvas.width = width;
		canvas.height = height;
		this.objects = {};
		this.groups = {};
		this.regions = {};
		this.colors = {
			"blue":"#0000FF",
			"lightblue":"#007FFF",
			"teal":"#00FFFF",
			"white":"#FFFFFF",
			"black":"#000000",
			"grey":"#222222",
			"red":"#FF0000",
			"purple":"#8B008B",
			"felicity":"#008000",
			"orange":"#FF8C00"
		};
		this.fonts = {
			"felicity":"Viga"
		};
		this.defaults = {
			text:{
				color:"white",
				size:20,
				font:"felicity",
				name:"[CanTools Text Object]",
				groups:[],
				region:null,
				align:"left",//left,center,right,start,end
				base:"alphabetic",//top,middle,bottom,alphabetic,hanging
				filled:true,
				strokesize:1
			},
			image:{
				name:"[CanTools Image Object]",
				groups:[],
				region:null,
				align:"left",//left,center,right
				base:"top"//top,middle,bottom
			}
		}
		canToolsDebugLogging("Created New Canvas (" + this + ")");
	}
	loadFonts(){
		for(var font = 0;font<Object.keys(this.fonts).length;font++){
			Display.text({
				text:"Render Font",
				x:0,
				y:0,
				color:"black",
				font:Object.keys(this.fonts)[font]
			});
		}
		canToolsDebugLogging("Loaded Fonts (" + Object.keys(this.fonts) + ")");
	}
	newObject(descriptions, instantAdd){
		if(typeof(descriptions) != "object"){
			canToolsGiveErrorMessage("Failed To Create New Object As The Provided Descriptions Are Invalid");
			return;
		}
		if(descriptions.name == undefined){
			if(descriptions.type != undefined){
				canToolsGiveErrorMessage("No Name Defined For Object Type (" + descriptions.type + ")");
			} else {
				canToolsGiveErrorMessage("No Name Defined For Object Of Unknown Type");
			}
			return;
		}
		if(descriptions.type == undefined){
			canToolsGiveErrorMessage("No Type Defined For Object (" + descriptions.name + ")");
			return;
		}
		if(descriptions.name in this.objects){
			canToolsGiveErrorMessage("Failed To Create New Object (" + descriptions.type + ") As (" + descriptions.name + ") For It Already Exists");
			return;
		}
		if(descriptions.group == undefined){
			descriptions.groups = this.defaults.text.groups;
		}
		if(descriptions.region == undefined){
			descriptions.region = this.defaults.text.region;
		}
		this.objects[descriptions.name] = descriptions;
		canToolsDebugLogging("Created New Object (" + descriptions.type + ") As (" + descriptions.name + ")");
		if(instantAdd){
			this.drawObject(descriptions.name);
		}
	}
	newGroup(name, objs){
		this.groups[name] = {};
		if(objs != undefined){
			for(var obj = 0;obj<objs.length;obj++){
				if(this.objects[objs[obj]]){
					this.groups[name][this.objects[objs[obj]].name] = this.objects[objs[obj]];
					this.objects[objs[obj]].groups.push(name);
				}
			}
			canToolsDebugLogging("Created New Group (" + name + ") With Objects (" + objs + ")");
		} else {
			canToolsDebugLogging("Created New Group (" + name + ")");
		}
	}
	newRegion(name, descriptions){
		if(name == undefined || typeof(name) != "string"){
			canToolsGiveErrorMessage("Unable To Make New Region As No Name Was Given");
			return;
		}
		if(typeof(descriptions) != "object"){
			canToolsGiveErrorMessage("Unable To Make New Region As The Descriptions Are Not Valid");
			return;
		}
		if(descriptions.objects != undefined){
			canToolsGiveErrorMessage("Unable To Make New Region (" + name + ") As Objects Were Listed Instead Of Groups");
			return;
		}
		if(descriptions.groups != undefined && typeof(descriptions.groups)){
			this.regions[name] = descriptions;
			canToolsDebugLogging("Created New Region (" + name + ")");
		} else {
			canToolsGiveErrorMessage("Unable To Make New Region (" + name + ") As No Groups Were Provided");
			return;
		}
	}
	drawObject(name){
		if(name in this.objects){
			var obj = this.objects[name];
			switch(obj.type){
				case "text":
					this.text(obj);
					break;
				case "image":
					this.image(obj);
					break;
				default:
					canToolsDebugLogging("Unknown Object Type (" + obj.type + ") From Object (" + name + ")");
			}
			if(CanTools.config.superdebug){
				canToolsDebugLogging("Drew Object (" + obj.type + ") Named (" + name + ")");
			}
		} else {
			canToolsGiveErrorMessage("Object Cannot Be Drawn Because It Does Not Exist (" + name + ")");
		}
	}
	drawGroup(name){
		for(var obj = 0;obj<Object.keys(this.groups[name]).length;obj++){
			this.drawObject(Object.keys(this.groups[name])[obj]);
		}
		if(CanTools.config.superdebug){
			canToolsDebugLogging("Drew Group (" + name + ") With Objects (" + Object.keys(this.groups[name]) + ")");
		}
	}
	drawRegion(name){
		for(var grp = 0;grp<this.regions[name].groups;grp++){
			this.drawGroup(this.regions[name].groups[grp]);
		}
		if(CanTools.config.superdebug){
			canToolsDebugLogging("Drew Region (" + name + ") With Groups (" + this.regions[name].groups + ")");
		}
	}
	changeObject(name, descriptions){
		if(name in this.objects){
			if(descriptions.type == undefined && descriptions.name == undefined){
				for(var desc in descriptions){
					this.objects[name][desc] = descriptions[desc];
					console.log(desc);
				}
				canToolsDebugLogging("Changed Object (" + name + ")");
			} else {
				canToolsGiveErrorMessage("Could Not Modify Object (" + name + ") Due To A New Name Or Type Provided");
			}
		} else {
			canToolsGiveErrorMessage("Could Not Modify Object (" + name + ") For It Does Not Exist");
		}
	}
	getGroupObjects(name){
		return this.groups[name];
	}
	fill(color, transparency){
		this._saveValues();
		if(transparency != undefined){
			this.context.globalAlpha = transparency;
		}
		if(color in this.colors){
			this.context.fillStyle = this.colors[color];
		} else {
			this.context.fillStyle = color;
		}
		this.context.fillRect(0, 0, this.width, this.height);
		this._resetValues();
		canToolsDebugLogging("Canvas Filled (" + color + ")");
	}
	text(descriptions){
		this._saveValues();
		if(descriptions.name == undefined){
			descriptions.name = this.defaults.text.name;
		}
		if(descriptions.region == undefined){
			descriptions.region = this.defaults.text.region;
		}
		if(descriptions.text == undefined){
			canToolsGiveErrorMessage("No Text Was Defined (" + descriptions.name + ")");
			return;
		}
		if(descriptions.x == undefined){
			canToolsGiveErrorMessage("No X Coordinate Was Defined (" + descriptions.name + ")");
			return;
		}
		if(descriptions.y == undefined){
			canToolsGiveErrorMessage("No Y Coordinate Was Defined (" + descriptions.name + ")");
			return;
		}
		if(descriptions.align == undefined){
			descriptions.align = this.defaults.text.align;
		}
		if(descriptions.base == undefined){
			descriptions.base = this.defaults.text.base;
		}
		if(descriptions.filled == undefined){
			descriptions.filled = this.defaults.text.filled;
		}
		if(descriptions.strokesize == undefined){
			descriptions.strokesize = this.defaults.text.strokesize;
		}
		if(descriptions.color == undefined){
			descriptions.color = this.defaults.text.color;
		} else if(descriptions.color in this.colors){
			descriptions.color = this.colors[descriptions.color];
		}
		if(descriptions.size == undefined){
			descriptions.size = this.defaults.text.size;
		}
		if(descriptions.font == undefined){
			if(this.defaults.text.font in this.fonts){
				descriptions.font = descriptions.size + "px " + this.fonts[this.defaults.text.font];
			} else {
				descriptions.font = descriptions.size + "px " + this.defaults.text.font;
			}
		} else if(descriptions.font in this.fonts){
			descriptions.font = descriptions.size + "px " + this.fonts[descriptions.font];
		} else if(descriptions.font.indexOf("px ") == -1){
			descriptions.font = descriptions.size + "px " + descriptions.font;
		}
		if(descriptions.region != null){
			descriptions.x += descriptions.region.x;
			descriptions.y += descriptions.region.y;
		}
		this._updateValues({
			color:descriptions.color,
			font:descriptions.font,
			align:descriptions.align,
			base:descriptions.base,
			strokesize:descriptions.strokesize
		});
		if(descriptions.filled){
			this.context.fillText(descriptions.text, descriptions.x, descriptions.y);
		} else {
			this.context.strokeText(descriptions.text, descriptions.x, descriptions.y);
		}
		this._resetValues();
		canToolsDebugLogging("Wrote Text (" + descriptions.name + ") With Message (" + descriptions.text + ")");
	}
	image(descriptions){
		this._saveValues();
		if(descriptions.name == undefined){
			descriptions.name = this.defaults.image.name;
		}
		if(descriptions.region == undefined){
			descriptions.region = this.defaults.image.region;
		}
		if(descriptions.align == undefined){
			descriptions.align = this.defaults.image.align;
		}
		if(descriptions.base == undefined){
			descriptions.base = this.defaults.image.base;
		}
		if(descriptions.image == undefined){
			canToolsGiveErrorMessage("No Image Was Defined (" + descriptions.name + ")");
			return;
		}
		if(descriptions.width == undefined){
			descriptions.width = descriptions.image.width;
		}
		if(descriptions.height == undefined){
			descriptions.height = descriptions.image.height;
		}
		if(descriptions.x == undefined){
			canToolsGiveErrorMessage("No X Coordinate Was Defined (" + descriptions.name + ")");
			return;
		} else if(!descriptions.UpdatedAlign){
			switch(descriptions.align){
				case "center":
					descriptions.x = descriptions.x - (descriptions.width / 2);
					break;
				case "right":
					descriptions.x = descriptions.x - descriptions.width;
					break;
				default:
					break;
			}
			descriptions.UpdatedAlign = true;
		}
		if(descriptions.y == undefined){
			canToolsGiveErrorMessage("No Y Coordinate Was Defined (" + descriptions.name + ")");
			return;
		} else if(!descriptions.UpdatedBase){
			switch(descriptions.base){
				case "middle":
					descriptions.y = descriptions.y - (descriptions.height /2);
					break;
				case "bottom":
					descriptions.y = descriptions.y - descriptions.height;
					break;
				default:
					break;
			}
			descriptions.UpdatedBase = true;
		}
		if(descriptions.region != null){
			descriptions.x += descriptions.region.x;
			descriptions.y += descriptions.region.y;
		}
		this.context.drawImage(descriptions.image, descriptions.x, descriptions.y, descriptions.width, descriptions.height);
		this._resetValues();
		canToolsDebugLogging("Drew Image (" + getKeyByValue(LoadedImages, descriptions.image) + ")");
	}
	_updateValues(options){
		if(options.color != undefined){
			this.context.fillStyle = options.color;
			this.context.strokeStyle = options.color;
		}
		if(options.font != undefined){
			this.context.font = options.font;
		}
		if(options.align != undefined){
			this.context.textAlign = options.align;
		}
		if(options.base != undefined){
			this.context.textBaseline = options.base;
		}
		if(options.strokesize != undefined){
			this.context.lineWidth = options.strokesize;
		}
		if(CanTools.config.superdebug){
			canToolsDebugLogging("Canvas Values Changed");
		}
	}
	_saveValues(){
		this.context.save();
		if(CanTools.config.superdebug){
			canToolsDebugLogging("Canvas Saved");
		}
	}
	_resetValues(){
		this.context.restore();
		if(CanTools.config.superdebug){
			canToolsDebugLogging("Canvas Restored");
		}
	}
}

function canToolsDebugLogging(message){
	if(CanTools.config.debug){
		console.log("%c[CanTools - Version " + CanTools.config.version + "] " + message, "color:#FFFF00");
	}
}

function canToolsGiveErrorMessage(message){
	if(CanTools.config.debug){
		console.error("%c\n[CanTools - Version " + CanTools.config.version + "] " + message + "\n", "color:#ffffff;font-style:italic;font-weight:bold");
	}
}

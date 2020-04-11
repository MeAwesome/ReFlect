//Developed By: Isaac Robbins
//For Use With: ReFlect

var Clock = {
	settings:{
		type:"standard"
	},
	runner:function(){
		mirror.box(0, 0, 300, 200, Color.white);
		mirror.text(Clock.getTime(), 20, 50, Color.felicity, 150, "Ubuntu", "top-left");
	},
	getHour:function(){
		if(Clock.settings.type == "standard"){
			return moment().format("h");
		} else {
			return moment().format("H");
		}
	},
	getMinute:function(){
		return moment().format("mm");
	},
	getSecond:function(){
		return moment().format("ss");
	},
	getPeriod:function(){
		return moment().format("A");
	},
	getTime:function(){
		if(Clock.settings.type == "standard"){
			return moment().format("h:mm");
		} else {
			return moment().format("H:mm");
		}
	},
	getTimeWithSeconds:function(){
		if(Clock.settings.type == "standard"){
			return moment().format("h:mm:ss");
		} else {
			return moment().format("H:mm:ss");
		}
	},
	getTimeWithPeriod:function(){
		if(Clock.settings.type == "standard"){
			return moment().format("h:mm A");
		} else {
			return moment().format("H:mm");
		}
	}
}

window.addEventListener("melodyHeard", (e) => {
  if(Melody.lastHeard.contains("time")){
    Melody.say("The time is " + Clock.getTimeWithPeriod());
  }
});

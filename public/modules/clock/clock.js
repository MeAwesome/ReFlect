//Developed By: Isaac Robbins
//For Use With: ReFlect

var Clock = {
	getHour:function(type){
		if(type == "standard"){
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
	getTime:function(type){
		if(type == "standard"){
			return moment().format("h:mm");
		} else {
			return moment().format("H:mm");
		}
	},
	getTimeWithSeconds:function(type){
		if(type == "standard"){
			return moment().format("h:mm:ss");
		} else {
			return moment().format("H:mm:ss");
		}
	},
	runner:function(){
		mirror.box(0, 0, 300, 200, Color.black);
		mirror.text(Clock.getTime("standard"), 20, 50, Color.felicity, 50, "Ubuntu");
	}
}

window.addEventListener("melodyHeard", (e) => {
  if(Melody.lastHeard.contains("time")){
    Melody.say("The time is " + Clock.getTime() + moment().format("A"));
  }
});

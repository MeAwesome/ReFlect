//Developed By: Isaac Robbins
//For Use With: ReFlect

const Mirror = {

}

function refreshMirror(){
  Clock.runner();
  mirrorDisplay.copyData(mirror, 0, 0, mirrorDisplay.canvas.width, mirrorDisplay.canvas.height);
  window.requestAnimationFrame(refreshMirror);
}

function weather(){
  Melody.say("I don't have the information for the weather yet.");
}

function hi(){
  Melody.say("Hello! What can I do for you?", true);
}

window.addEventListener("melodyLoaded", (e) => {
	Melody.addCommand("wake", ["hello"], hi);
  Melody.addCommand("weather", ["weather", "today"], weather);
});
/*
window.addEventListener("melodyHeard", (e) => {
  if(Melody.lastHeard.containsOne(["hi", "hello", "hey", "what's up", "high", "hay"])){

  } else if(Melody.lastHeard.containsAll(["weather", "today"])){

  }
});
*/

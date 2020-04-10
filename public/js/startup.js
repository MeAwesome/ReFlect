window.onload = function(){

}

window.speechSynthesis.onvoiceschanged = function(){
  createScriptElement("/public/melody.js");
}

window.addEventListener("melodyHeard", (e) => {
  if(Melody.lastHeard.containsOne(["hi", "hello", "hey", "what's up"])){
    Melody.say("Hello! What can I do for you?", true);
  } else if(Melody.lastHeard.containsAll(["weather", "today"])){
    Melody.say("I don't have the information for the weather yet.");
  } else if(Melody.lastHeard.contains("time")){
    Melody.say("The time is " + new Date().toTimeString());
  }
});

function createScriptElement(src){
  var script = document.createElement("script");
  script.src = src;
  script.onload = function(){
    document.head.appendChild(script);
  }
}

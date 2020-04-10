window.onload = function(){
  createScriptElement(undefined, "melody");
}

window.speechSynthesis.onvoiceschanged = function(){
  document.getElementById("melody").src = "/public/js/melody.js";
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

function createScriptElement(src, id){
  var script = document.createElement("script");
  if(src){
    script.src = src;
  }
  if(id){
    script.id = id;
  }
  document.head.appendChild(script);
}

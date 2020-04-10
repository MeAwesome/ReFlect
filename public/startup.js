window.speechSynthesis.onvoiceschanged = function(){
  document.getElementById("deviceScript").src = "/public/melody.js";
}

window.addEventListener("melodyHeard", (e) => {
  if(Melody.lastHeard.containsOne(["hi", "hello", "hey"])){
    Melody.say("Hello! What can I do for you?", true);
  } else if(Melody.lastHeard.contains("time")){
    Melody.say("The time is " + new Date().toTimeString());
  }
});

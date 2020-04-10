window.speechSynthesis.onvoiceschanged = function(){
  document.getElementById("deviceScript").src = "/public/melody.js";
}

window.addEventListener("melodyHeard", (e) => {
  if(Melody.followUp && Melody.lastHeard.contains("anything")){
    Melody.say("Of course Isaac");
  }
  if(Melody.lastHeard.contains("hello")){
    Melody.say("Hello! What can I do for you?", true);
  } else if(Melody.lastHeard.contains("time")){
    Melody.say("The time is " + new Date().toTimeString());
  }
});

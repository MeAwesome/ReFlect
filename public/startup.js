window.speechSynthesis.onvoiceschanged = function(){
  document.getElementById("deviceScript").src = "/public/melody.js";
}

window.addEventListener("melodyHeard", (e) => {
  if(Melody.lastHeard.contains("Melody")){
    if(Melody.lastHeard.contains("time")){
      Melody.say("The time is " + new Date().toTimeString());
    }
  }
});

window.speechSynthesis.onvoiceschanged = function(){
  document.getElementById("deviceScript").src = "/public/felicity.js";
}

window.addEventListener("felicityHeard", (e) => {
  if(Felicity.lastHeard.contains("Felicity")){
    if(Felicity.lastHeard.contains("time")){
      Felicity.say("The time is " + new Date().toTimeString());
    }
  }
});

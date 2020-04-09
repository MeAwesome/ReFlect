window.speechSynthesis.onvoiceschanged = function(){
  document.getElementById("deviceScript").src = "/public/felicity.js";
}

window.addEventListener("felicityHeard", (e) => {
  if(Felicity.lastHeard.indexOf("Felicity") > -1){
    if(Felicity.lastHeard.indexOf("time") > -1){
      Felicity.say("The time is " + new Date().toTimeString());
    }
  }
});

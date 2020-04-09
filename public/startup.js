window.speechSynthesis.onvoiceschanged = function(){
  document.getElementById("deviceScript").src = "/public/felicity.js";
}

window.addEventListener("felicityHeard", (e) => {
  if(Felicity.lastHeard == "testing"){
    Felicity.say("You said testing!");
  }
});

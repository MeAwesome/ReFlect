window.speechSynthesis.onvoiceschanged = function(){
  document.getElementById("deviceScript").src = "/public/felicity.js";
}

window.addEventListener("felicityHeard", (e) => {
  if(Felicity.lastHeard == "hello"){
    Felicity.say("You said hello!");
  }
});

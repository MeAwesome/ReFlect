window.speechSynthesis.onvoiceschanged = function(){
  document.getElementById("deviceScript").src = "/public/felicity.js";
}

window.addEventListener("felicityHeard", (e) => {
  console.log(e);
});

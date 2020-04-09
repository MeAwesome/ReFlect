window.onload = function(){
  loadFelicity();
}

function loadFelicity(){
  if("speechSynthesis" in window){
    console.log(winodow.speechSynthesis.getVoices());
    document.getElementById("deviceScript").src = "/public/felicity.js";
  } else {
    loadFelicity();
  }
}

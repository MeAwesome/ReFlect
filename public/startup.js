window.onload = function(){
  loadFelicity();
}

function loadFelicity(){
  if("speechSynthesis" in window){
    document.getElementById("deviceScript").src = "/public/felicity.js";
  } else {
    loadFelicity();
  }
}

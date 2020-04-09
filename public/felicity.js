const Felicity = {
  talking:false,
  say:function(message){
    var msg = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(msg);
  }
}

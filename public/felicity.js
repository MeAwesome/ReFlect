const Felicity = {
  talking:false,
  say:function(message){
    var msg = new SpeechSynthesisUtterance(message);
    msg.lang = 'en-US';
    msg.voice = window.speechSynthesis.getVoices()[4];
    msg.onend = function(e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    window.speechSynthesis.speak(msg);
  }
}

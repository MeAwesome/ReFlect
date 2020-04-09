const Felicity = {
  talking:false,
  utterance:new SpeechSynthesisUtterance(),
  voice:window.speechSynthesis.getVoices()[4],
  say:function(message){
    var msg = this.utterance;
    msg.text = message;
    msg.voice = this.voice;
    msg.onend = function(e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    window.speechSynthesis.speak(msg);
  }
}

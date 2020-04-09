const Felicity = {
  talking:false,
  utterance:new SpeechSynthesisUtterance(),
  settings:{
    lang:"en-US",
    voice:window.speechSynthesis.getVoices()[4]
  },
  say:function(message){
    var msg = this.utterance;
    msg.text = message;
    msg.lang = this.settings.lang;
    msg.voice = this.settings.voice;
    msg.onend = function(e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    window.speechSynthesis.speak(msg);
  }
}

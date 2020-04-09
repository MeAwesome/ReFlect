window.onload = function(){
  Felicity = {
    talking:false,
    utterance:new SpeechSynthesisUtterance(),
    voice:undefined,
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
  Felicity.voice = window.speechSynthesis.getVoices()[4];
}

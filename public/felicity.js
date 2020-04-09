export const Felicity = {
  talking:false,
  voices:window.speechSynthesis.getVoices(),
  voice:4,
  say:function(message){
    var msg = new SpeechSynthesisUtterance(message);
    msg.voice = this.voices[this.voice];
    msg.onend = function(e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    window.speechSynthesis.speak(msg);
  }
}

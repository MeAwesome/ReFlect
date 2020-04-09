const Felicity = {
  talking:false,
  say:function(message){
    var msg = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(msg);
  }
}

var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; // Note: some voices don't support altering params
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 2; //0 to 2
msg.text = 'Hello World';
msg.lang = 'en-US';

msg.onend = function(e) {
  console.log('Finished in ' + event.elapsedTime + ' seconds.');
};

speechSynthesis.speak(msg);

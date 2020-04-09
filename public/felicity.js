const Felicity = {
  talking:false,
  voices:window.speechSynthesis.getVoices(),
  recognizer:new webkitSpeechRecognition(),
  settings:{
    voice:4,
    continuous:true,
    interimResults:true
  },
  say:function(message){
    var msg = new SpeechSynthesisUtterance(message);
    msg.voice = this.voices[this.settings.voice];
    msg.onend = function(e) {
      console.log('Finished in ' + event.elapsedTime + ' seconds.');
    };
    window.speechSynthesis.speak(msg);
  },
  this.recognizer.onstart:function(){
    console.log("Listening...");
  },
  this.recognizer.onresult:function(res){
    console.log(res);
  },
  this.recognizer.onend:function(){
    console.log("Stopped Listening");
  }
}

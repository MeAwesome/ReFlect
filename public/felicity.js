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
  }
}

Felicity.recognizer.continuous = true;
Felicity.recognizer.interimResults = true;
Felicity.recognizer.onstart = function(){
  console.log("Listening...");
},
Felicity.recognizer.onresult = function(res){
  console.log(res.results[0]);
},
Felicity.recognizer.onend = function(){
  console.log("Stopped Listening");
}
Felicity.recognizer.start();

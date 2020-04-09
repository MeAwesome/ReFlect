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
    msg.onstart = function(e){
      Felicity.talking = true;
      console.log(Felicity.talking);
    }
    msg.onend = function(e) {
      Felicity.talking = false;
      console.log(Felicity.talking);
    };
    window.speechSynthesis.speak(msg);
  }
}

var results;
Felicity.recognizer.continuous = true;
Felicity.recognizer.interimResults = true;
Felicity.recognizer.onstart = function(){
  console.log("Listening...");
},
Felicity.recognizer.onresult = function(res){
  if(!Felicity.talking && res.results[res.resultIndex].isFinal){
    results = res;
    console.log(res.results[res.resultIndex][0].transcript);
    Felicity.say(res.results[res.resultIndex][0].transcript);
  }
},
Felicity.recognizer.onend = function(){
  console.log("Stopped Listening");
  Felicity.recognizer.start();
}
Felicity.recognizer.start();

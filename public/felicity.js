const Felicity = {
  talking:false,
  voices:window.speechSynthesis.getVoices(),
  recognizer:new webkitSpeechRecognition(),
  lastHeard:undefined,
  eventMessanger:new Event("felicityHeard"),
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
    }
    msg.onend = function(e) {
      Felicity.talking = false;
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
  results = res;
  if(!Felicity.talking && res.results[res.resultIndex].isFinal){
    Felicity.lastHeard = res.results[res.resultIndex][0].transcript.trim();
    window.dispatchEvent(Felicity.eventMessanger);
  }
},
Felicity.recognizer.onend = function(){
  console.log("Stopped Listening");
  Felicity.recognizer.start();
}
Felicity.recognizer.start();

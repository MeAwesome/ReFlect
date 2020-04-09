const Felicity = {
  talking:false,
  voices:window.speechSynthesis.getVoices(),
  recognizer:new webkitSpeechRecognition() || new SpeechRecognition(),
  lastHeard:undefined,
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
  document.getElementById("result").textContent = res.results[res.resultIndex][0].transcript.trim();
  if(!Felicity.talking && res.results[res.resultIndex].isFinal && res.results[res.resultIndex][0].confidence >= 0.90){
    Felicity.lastHeard = res.results[res.resultIndex][0].transcript.trim();
    window.dispatchEvent(new Event("felicityHeard"));
  }
},
Felicity.recognizer.onend = function(){
  console.log("Stopped Listening");
  Felicity.recognizer.start();
}
Felicity.recognizer.start();

String.prototype.contains = function(string){
  return this.indexOf(string) > -1;
}

const Melody = {
  talking:false,
  voices:window.speechSynthesis.getVoices(),
  recognizer:new webkitSpeechRecognition(),
  lastHeard:undefined,
  settings:{
    voice:4,
    continuous:true,
    interimResults:true,
    lang:"en-US",
    maxAlternatives:10
  },
  say:function(message){
    var msg = new SpeechSynthesisUtterance(message);
    msg.voice = this.voices[this.settings.voice];
    msg.onstart = function(e){
      Melody.talking = true;
    }
    msg.onend = function(e) {
      Melody.talking = false;
    };
    window.speechSynthesis.speak(msg);
  }
}

var results;
Melody.recognizer.continuous = Melody.settings.continuous;
Melody.recognizer.interimResults = Melody.settings.interimResults;
Melody.recognizer.lang = Melody.settings.lang;
Melody.recognizer.maxAlternatives = Melody.settings.maxAlternatives;
Melody.recognizer.onstart = function(){
  console.log("Listening...");
},
Melody.recognizer.onresult = function(res){
  results = res;
  document.getElementById("result").textContent = res.results[res.resultIndex][0].transcript.trim();
  if(!Melody.talking && res.results[res.resultIndex].isFinal){
    Melody.lastHeard = res.results[res.resultIndex][0].transcript.trim();
    window.dispatchEvent(new Event("melodyHeard"));
  }
},
Melody.recognizer.onend = function(){
  console.log("Stopped Listening");
  Melody.recognizer.start();
}
Melody.recognizer.start();

String.prototype.contains = function(string){
  return this.indexOf(string) > -1;
}

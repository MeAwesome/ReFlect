//Developed By: Isaac Robbins
//For Use With: ReFlect

const Melody = {
  talking:false,
  voices:undefined,
  recognizer:new webkitSpeechRecognition(),
  fallbackMode:undefined,
  lastHeard:undefined,
  followUp:false,
  settings:{
    wakeWord:"Melody",
    voice:4,
    continuous:true,
    interimResults:true,
    lang:"en-US",
    maxAlternatives:10
  },
  say:function(message, followUp){
    Melody.followUp = followUp || false;
    if(this.fallbackMode){
      responsiveVoice.speak(message, "UK English Female", {onstart:Melody._onstart,onend:Melody._onend});
    } else {
      var msg = new SpeechSynthesisUtterance(message);
      msg.voice = this.voices[this.settings.voice];
      msg.onstart = Melody._onstart();
      msg.onend = Melody._onend();
      window.speechSynthesis.speak(msg);
    }
  },
  _onstart:function(){
    Melody.talking = true;
  },
  _onend:function(){
    Melody.talking = false;
  }
}

if(window.speechSynthesis.getVoices().length == 0){
  Melody.voices = responsiveVoice.getVoices();
  Melody.fallbackMode = true;
} else {
  Melody.voices = window.speechSynthesis.getVoices();
  Melody.fallbackMode = false;
}

var results;
Melody.recognizer.continuous = Melody.settings.continuous;
Melody.recognizer.interimResults = Melody.settings.interimResults;
Melody.recognizer.lang = Melody.settings.lang;
Melody.recognizer.maxAlternatives = Melody.settings.maxAlternatives;
Melody.recognizer.onstart = function(){

},
Melody.recognizer.onresult = function(res){
  results = res;
  if(!Melody.talking && res.results[res.resultIndex].isFinal){
    var maxConfidenceResult = 0;
    var canSendEvent = false;
    if(Melody.followUp == false){
      for(var r = 0; r < res.results[res.resultIndex].length; r++){
        if(res.results[res.resultIndex][r].transcript.trim().contains(Melody.settings.wakeWord) && res.results[res.resultIndex][r].confidence >= res.results[res.resultIndex][maxConfidenceResult].confidence){
          maxConfidenceResult = r;
          canSendEvent = true;
        }
      }
    } else {
      for(var r = 0; r < res.results[res.resultIndex].length; r++){
        if(res.results[res.resultIndex][r].confidence >= res.results[res.resultIndex][maxConfidenceResult].confidence){
          maxConfidenceResult = r;
          canSendEvent = true;
        }
      }
    }
    if(canSendEvent){
      Melody.lastHeard = res.results[res.resultIndex][maxConfidenceResult].transcript.trim();
      window.dispatchEvent(new Event("melodyHeard"));
    }
  }
},
Melody.recognizer.onend = function(){
  Melody.recognizer.start();
}
Melody.recognizer.start();

String.prototype.contains = function(string){
  return this.indexOf(string) > -1;
}

String.prototype.containsOne = function(array){
  for(var i = 0; i < array.length; i++){
    if(this.indexOf(array[i]) > -1){
      return true;
    }
  }
  return false;
}

String.prototype.containsAll = function(array){
  for(var i = 0; i < array.length; i++){
    if(this.indexOf(array[i]) == -1){
      return false;
    }
  }
  return true;
}

String.prototype.containsThisAndOne = function(string, array){
  if(this.indexOf(string) == -1){
    return false;
  }
  for(var i = 0; i < array.length; i++){
    if(this.indexOf(array[i]) > -1){
      return true;
    }
  }
  return false;
}

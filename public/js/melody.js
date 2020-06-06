//Developed By: Isaac Robbins
//For Use With: ReFlect

const Melody = {
  talking:false,
  voices:undefined,
  recognizer:new webkitSpeechRecognition(),
  fallbackMode:undefined,
  lastHeard:undefined,
  followUp:false,
  results:undefined,
  commands:{},
  lastAccessedCategory:undefined,
  settings:{
    wakeWord:"Melody",
    voice:4,
    continuous:true,
    interimResults:true,
    lang:"en-US",
    maxAlternatives:10
  },
  configureRecognizer:function(){
    this.recognizer.continuous = this.settings.continuous;
    this.recognizer.interimResults = this.settings.interimResults;
    this.recognizer.lang = this.settings.lang;
    this.recognizer.maxAlternatives = this.settings.maxAlternatives;
    this.recognizer.onresult = function(res){
      this.results = res;
      this.processSpeech(res);
    }
    this.recognizer.onend = function(){
      this.recognizer.start();
    }
  },
  say:function(message, followUp){
    this.followUp = followUp || false;
    if(this.fallbackMode){
      responsiveVoice.speak(message, "UK English Female", {onstart:Melody._onstart,onend:Melody._onend});
    } else {
      var msg = new SpeechSynthesisUtterance(message);
      msg.voice = this.voices[this.settings.voice];
      msg.onstart = this._onstart();
      msg.onend = this._onend();
      window.speechSynthesis.speak(msg);
    }
  },
  processSpeech:function(res){
    if(!this.talking && res.results[res.resultIndex].isFinal){
      var maxConfidenceResult = 0;
      var canSendEvent = false;
      if(this.followUp == false){
        for(var r = 0; r < res.results[res.resultIndex].length; r++){
          if(res.results[res.resultIndex][r].transcript.trim().contains(this.settings.wakeWord) && res.results[res.resultIndex][r].confidence >= res.results[res.resultIndex][maxConfidenceResult].confidence){
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
        this.lastHeard = res.results[res.resultIndex][maxConfidenceResult].transcript.trim();
        this.processCommand(this.lastHeard);
      }
    }
  },
  processCommand:function(command){
    if(this.lastAccessedCategory != undefined){
      for(var cmd = 0; cmd < this.commands[this.lastAccessedCategory].length; cmd++){
        if(command.containsAll(this.commands[this.lastAccessedCategory][cmd].words)){
          this.commands[this.lastAccessedCategory][cmd].callback();
        }
      }
    } else {
      for(var cat = 0; cat < Object.keys(this.commands).length; cat++){
        for(var cmd = 0; cmd < Object.keys(this.commands)[cat].length; cmd++){
          if(command.containsAll(this.commands[Object.keys(this.commands)[cat]][cmd].words)){
            this.lastAccessedCategory = Object.keys(this.commands)[cat];
            this.commands[Object.keys(this.commands)[cat]][cmd].callback();
          }
        }
      }
    }
  },
  addCommand:function(category, words, callback){
    if(this.commands[category] == undefined){
      this.commands[category] = [];
    }
    this.commands[category].push({words: words, callback: callback});
  },
  _onstart:function(){
    this.talking = true;
  },
  _onend:function(){
    this.talking = false;
  }
}

if(window.speechSynthesis.getVoices().length == 0){
  Melody.voices = responsiveVoice.getVoices();
  Melody.fallbackMode = true;
  responsiveVoice.debug = false;
} else {
  Melody.voices = window.speechSynthesis.getVoices();
  Melody.fallbackMode = false;
}

Melody.configureRecognizer();
Melody.recognizer.start();

window.dispatchEvent(new Event("melodyLoaded"));

//Below are added functions for Strings so you can have commands that run based on certain criteria


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

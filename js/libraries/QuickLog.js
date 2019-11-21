var Log = {
  DEBUG:true,
  intervals:{},
  log:function(message, color){
    if(color == undefined){
      color = Color.white;
    } else if(color in Color){
      color = Color[color];
    } else if(color.indexOf("#") == -1){
      color = "#" + Color.toHex(color);
    }
    console.log("%c" + message, "color:" + color);
  },
  debugLog:function(message, color){
    if(Log.DEBUG == true){
      if(color == undefined){
        color = Color.white;
      } else if(color in Color){
        color = Color[color];
      } else if(color.indexOf("#") == -1){
        color = "#" + Color.toHex(color);
      }
      console.log("%c" + message, "color:" + color);
    }
  },
  warn:function(message){
    console.warn(message);
  },
  error:function(message){
    console.error(message);
  },
  whenEqualsLog:function(variable, value, message, color){
    var id = Math.random();
    Log.intervals[id] = setInterval(() => {
      if(eval(variable) == value && id in Log.intervals){
        Log.log(message, color);
        clearInterval(Log.intervals[id]);
        delete Log.intervals[id];
      }
    }, 100, id, variable, value, message, color);
  }
}

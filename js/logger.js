var Log = {
  log:function(message, color){
    if(color == undefined){
      color = Color.white;
    } else if(color in Color){
      color = Color[color];
    } else if(color.indexOf("#") == -1){
      color = "#" + Color.toHex(color);
    }
    console.log("%c"message, "color:" + color);
  },
  warn:function(message){
    console.warn(message);
  },
  error:function(message){
    console.error(message);
  }
}

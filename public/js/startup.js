window.onload = function(){
  //Load in required scripts
  createScriptElement("/public/js/Paint.js");
  createScriptElement("/public/js/Color.js");
  createScriptElement("/public/js/Photo.js");
  createScriptElement("/public/js/melody.js");
  //Initialize the drawing and displaying canvases
  mirror = new Paint("mirror");
  mirrorDisplay = new Paint("mirrorDisplay");
  mirror.makeBuffer(mirrorDisplay);
  mirror.setSize(1280, 720);
  mirror.setVisibility(false);
  mirrorDisplay.setSize(window.innerWidth, window.innerHeight);
  mirrorDisplay.setVisibility(true);

  mirror.fill(Color.black);
  mirror.text("ReFlect", 100, 100, Color.felicity, 150, "Ubuntu");
}

function runner(){
  mirrorDisplay.copyData(mirror, 0, 0, mirrorDisplay.canvas.width, mirrorDisplay.canvas.height);
  tickCount = (tickCount + 1) % 60;
  window.requestAnimationFrame(runner);
}

window.addEventListener("melodyHeard", (e) => {
  if(Melody.lastHeard.containsOne(["hi", "hello", "hey", "what's up"])){
    Melody.say("Hello! What can I do for you?", true);
  } else if(Melody.lastHeard.containsAll(["weather", "today"])){
    Melody.say("I don't have the information for the weather yet.");
  } else if(Melody.lastHeard.contains("time")){
    Melody.say("The time is " + new Date().toTimeString());
  }
});

function createScriptElement(src){
  var script = document.createElement("script");
  script.src = src;
  document.head.appendChild(script);
}

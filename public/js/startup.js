window.onload = async function(){
  //Load in required scripts
  await createScriptElement("/public/js/Paint.js");
  await createScriptElement("/public/js/Color.js");
  await createScriptElement("/public/js/Photo.js");
  draw();
}

window.speechSynthesis.onvoiceschanged = function(){
  //Loads seperate because of voices needing to load in
  //Cannot use createScriptElement or multiple are loaded in and breaks
  document.getElementById("melody").src = "/public/js/melody.js";
}

function draw(){
  //Initialize the drawing and displaying canvases
  mirror = new Paint("mirror");
  mirrorDisplay = new Paint("mirrorDisplay");
  mirror.makeBuffer(mirrorDisplay);
  mirror.setSize(1280, 720);
  mirror.setVisibility(false);
  mirrorDisplay.setSize(window.innerWidth, window.innerHeight);
  mirrorDisplay.setVisibility(true);

  mirror.fill(Color.black);
  mirror.text("ReFlect", 640, 360, Color.felicity, 200, "Ubuntu", "centered");
  runner();
}

function runner(){
  mirrorDisplay.copyData(mirror, 0, 0, mirrorDisplay.canvas.width, mirrorDisplay.canvas.height);
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
  return new Promise((resolve) => {
    var script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
    script.onload = function(){
      resolve();
    }
  });
}

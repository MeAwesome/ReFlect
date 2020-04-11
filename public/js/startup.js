//Developed By: Isaac Robbins
//For Use With: ReFlect

window.onload = async function(){
  //Load in required scripts
  //Must use await so all files load before use
  await createScriptElement("/public/js/mirror.js");
  await createScriptElement("/public/js/Paint.js");
  await createScriptElement("/public/js/Color.js");
  await createScriptElement("/public/js/Photo.js");
  await createScriptElement("/public/modules/clock/clock.js");
  setupDisplay();
}

window.speechSynthesis.onvoiceschanged = async function(){
  //Loads seperate because of voices needing to load in
  await createScriptElement("/public/js/melody.js");
}

function setupDisplay(){
  //Initialize the drawing and displaying canvases
  mirror = new Paint("mirror");
  mirrorDisplay = new Paint("mirrorDisplay");
  mirror.makeBuffer(mirrorDisplay);
  mirror.setSize(3840, 2160);
  mirror.setVisibility(false);
  mirrorDisplay.setSize(window.innerWidth, window.innerHeight);
  mirrorDisplay.setVisibility(true);
  //Have screen resize with browser
  window.addEventListener("resize", () => {
    mirrorDisplay.setSize(window.innerWidth, window.innerHeight);
  }, {passive:false});
  //Start the mirror
  refreshMirror();
}

function createScriptElement(src){
  return new Promise((resolve) => {
    var scripts = document.getElementsByTagName("script");
    for(var s = 0; s < scripts.length; s++){
      if(scripts[s].src == window.location.origin + src){
        resolve();
        return;
      }
    }
    var script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
    script.onload = function(){
      resolve();
    }
  });
}

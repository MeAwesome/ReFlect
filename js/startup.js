async function startReFlect(){
  if(await checkLibraries()){
    setLoadingProgressText("Initializing The Canvas");
    MAIN_DISPLAY = CanTools.Canvas("mirrorDisplay", $(window).width(), $(window).height());
    setLoadingProgressText("Loading Modules [" + CONFIGURATION.modules.length + "]");
    return 200;
  } else {
    try{
      Log.error("Libraries were not loaded successfully - Exiting");
    } catch {
      console.error("Libraries were not loaded successfully - Exiting");
    }
    setLoadingProgressText("Error 404 - Libraries Not Found", true);
    return 404;
  }
}

async function checkLibraries(){
  var error = false;
  try{
    CONFIGURATION = JSON.parse(await WebTalk.get("/configuration.json"));
    CONFIGURATION.libraries.forEach((library) => {
      try{
        if((typeof(eval(library)) != "object" || typeof(eval(library)) != "function") && typeof(library) != "string"){
          Log.error(library + " was not loaded");
          error = true;
        };
      } catch {
        Log.error(library + " was not loaded");
        error = true;
      }
    });
  } catch {
    try{
      Log.error("'configuration.json' could not be obtained");
    } catch {
      console.error("'Log' was not loaded and 'configuration.json' could not be obtained");
    }
    error = true;
  }
  return !error;
}

function setLoadingProgressText(message, error){
  document.getElementById("Loading Progress").innerHTML = message;
  if(error){
    document.getElementById("Loading Image").src = "/images/logos/ReFlectErrorBlack.svg";
  }
}

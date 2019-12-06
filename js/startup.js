async function startReFlect(){
  if(await checkLibraries() == 200){
    setLoadingProgressText("Initializing The Canvas");
    MAIN_DISPLAY = CanTools.Canvas("mirrorDisplay", $(window).width(), $(window).height());
    setLoadingProgressText("Loading Modules [" + CONFIGURATION.modules.length + "]");
    if(await loadModules() == 200){
      setLoadingProgressText("Starting ReFlect");
    } else {
      Log.error("A module was not loaded successfully - Exiting");
      setLoadingProgressText("Error 404 - Modules Not Loaded", true);
      return 404;
    }
  } else {
    try{
      Log.error("Libraries were not loaded successfully - Exiting");
    } catch {
      console.error("Libraries were not loaded successfully - Exiting");
    }
    setLoadingProgressText("Error 404 - Libraries Not Found", true);
    return 404;
  }
  return 200;
}

async function checkLibraries(){
  var code = 200;
  try{
    CONFIGURATION = JSON.parse(await WebTalk.get("/configuration.json"));
    CONFIGURATION.libraries.forEach((library) => {
      try{
        if((typeof(eval(library)) != "object" || typeof(eval(library)) != "function") && typeof(library) != "string"){
          Log.error(library + " was not loaded");
          code = 404;
        };
      } catch {
        Log.error(library + " was not loaded");
        code = 404;
      }
    });
  } catch {
    try{
      Log.error("'configuration.json' could not be obtained");
    } catch {
      console.error("'Log' was not loaded and 'configuration.json' could not be obtained");
    }
    code = 404;
  }
  return code;
}

async function loadModules(){
  var code = 200;
  try{
    MODULES = {};
    await CONFIGURATION.modules.forEach(async (mod) => {
      if(typeof(mod) == "string"){
        try{
          await WebTalk.loadScript("/modules/" + mod + mod.replace("default", "") + ".js");
          MODULES[mod.replace("default/", "").capitalize()] = eval(mod.replace("default/", "").capitalize());
        } catch {
          Log.error(mod.replace("default/", "").capitalize() + " does not contain " + mod.replace("default/", "") + ".js or the object " + mod.replace("default/", "").capitalize());
          code = 404;
          return code;
        }
      } else {
        Log.error(mod.replace("default/", "").capitalize() + " was not loaded");
        code = 404;
        return code;
      };
    });
  } catch {
    Log.error("CONFIGURATION does not contain 'modules'");
    code =  404;
  }
  return code;
}

function setLoadingProgressText(message, error){
  document.getElementById("Loading Progress").innerHTML = message;
  if(error){
    document.getElementById("Loading Image").src = "/images/logos/ReFlectErrorBlack.svg";
  }
}

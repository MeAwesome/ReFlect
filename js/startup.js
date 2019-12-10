async function startReFlect(){
  setLoadingProgressText("Connecting To Server");
  await WebTalk.createConnection();
  await WebTalk.connectTo(getDeviceType());
  CONFIGURATION = JSON.parse(await WebTalk.getPromise("/configuration.json"));
  setLoadingProgressText("Initializing The Canvas");
  MAIN_DISPLAY = CanTools.Canvas("mirrorDisplay", $(window).width(), $(window).height());
  if(await loadModules() == 200){
    setLoadingProgressText("Starting ReFlect");
  } else {
    Log.error("A module was not loaded successfully - Exiting");
    setLoadingProgressText("Error 404 - Modules Not Loaded", true);
    return 404;
  }
}

function loadModules(){
  return new Promise(async (resolve, reject) => {
    if(CONFIGURATION.modules == undefined){
      reject("Error 404 - CONFIGURATION.modules is undefined");
      return 404;
    }
    setLoadingProgressText("Loading Modules [" + CONFIGURATION.modules.length + "]");
    MODULES = {};
      await CONFIGURATION.modules.forEach(async (mod) => {
        if(typeof(mod) == "string"){
          try{
            await WebTalk.loadScript("/modules/" + mod + mod.replace("default", "") + ".js");
            MODULES[mod.replace("default/", "").capitalize()] = eval(mod.replace("default/", "").capitalize());
          } catch {
            Log.error(mod.replace("default/", "").capitalize() + " does not contain " + mod.replace("default/", "") + ".js or the object " + mod.replace("default/", "").capitalize());
            reject(404);
          }
        } else {
          Log.error(mod.replace("default/", "").capitalize() + " was not loaded");
          reject(404);
        };
      });
      resolve(200);
  });
}

function setLoadingProgressText(message, error){
  document.getElementById("Loading Progress").innerHTML = message;
  if(error){
    document.getElementById("Loading Image").src = "/images/logos/ReFlectErrorBlack.svg";
  }
}

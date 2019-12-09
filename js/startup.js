async function startReFlect(){
  await WebTalk.createConnection();
  await WebTalk.connectTo(getDeviceType());
  Log.log(WebTalk.socketData.connectedToRoom);
  if(await checkLibraries() == 200){
    setLoadingProgressText("Initializing The Canvas");
    MAIN_DISPLAY = CanTools.Canvas("mirrorDisplay", $(window).width(), $(window).height());
    setLoadingProgressText("Loading Modules [" + CONFIGURATION.modules.length + "]");
    test = await loadModules();
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
    //return 404;
  }
  //return 200;
}

function getConfiguration(){
  return new Promise(async (resolve, reject) => {
    var configFile;
    try{
      configFile = await WebTalk.get("/configurationn.json");
    } catch{
      reject(404);
    }
    //CONFIGURATION = JSON.parse(configFile);
    //resolve(200);
  });
}

async function loadModules(){
  return await new Promise(async (resolve, reject) => {
    if(CONFIGURATION.modules == undefined){
      reject(404);
    }
    try{
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
    } catch {
      Log.error("CONFIGURATION does not contain 'modules'");
      reject(404);
    }
  });
}

function setLoadingProgressText(message, error){
  document.getElementById("Loading Progress").innerHTML = message;
  if(error){
    document.getElementById("Loading Image").src = "/images/logos/ReFlectErrorBlack.svg";
  }
}

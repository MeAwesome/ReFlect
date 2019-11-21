var LoadedImages = {
  DEBUG:true,
  images:{},
  saveImage:function(key, src){
    return new Promise((resolve) => {
			var image = new Image();
			image.src = dir;
			image.onload = function(){
				if(typeof(Log) != undefined && LoadedImages.DEBUG == true){
					Log.debugLog("Loaded Image ''" + key + "'' from '" + src + "'");
				}
        LoadedImages.images[key] = image;
				resolve();
			}
		});
  },
  setImage:function(key, img){
    LoadedImages.images[key] = img;
    if(typeof(Log) != undefined && LoadedImages.DEBUG == true){
      Log.debugLog("Set Image '" + key + "'");
    }
  },
  getImage:function(key){
    return LoadedImages.images[key];
  }
}

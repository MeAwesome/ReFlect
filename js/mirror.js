var Mirror = {
  running:"Home Page",
  homeLayout:CONFIGURATION.homeLayout,
  run:function(){
    for(var mod in MODULES){
      if(Mirror.running == "Home Page"){
        if(Mirror.homeLayout.contains(mod)){
          MODULES[mod].program.runner();
        }
      } else if(Mirror.running == mod){
        MODULES[mod].program.runner();
      }
    }
    window.requestAnimationFrame(Mirror.run);
  }
}

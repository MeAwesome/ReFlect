var Mirror = {
  currentPage:"Home Page",
  homeLayout:CONFIGURATION.homeLayout,
  run:function(){
    for(var mod in MODULES){
      if(Mirror.homeLayout.contains(mod)){
        MODULES[mod].program.runner();
      }
    }
    window.requestAnimationFrame(Mirror.refresh);
  }
}

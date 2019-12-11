var Mirror = {
  currentPage:"Home Page",
  homeLayout:CONFIGURATION.homeLayout,
  start:function(){
    for(var mod in MODULES){
      if(Mirror.homeLayout.contains(mod)){
        MODULES[mod].program.runner();
      }
    }
    Mirror.refresh();
  },
  refresh:function(){
    for(var mod in MODULES){
      if(Mirror.homeLayout.contains(mod)){
        MODULES[mod].program.runner();
      }
    }
    window.requestAnimationFrame(Mirror.refresh);
  }
}

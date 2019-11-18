function startReFlect(){
  DISPLAY = document.getElementById("mirrorDisplay");
  CONTEXT = DISPLAY.getContext("2d");
  DISPLAY.width = $(window).width();
  CONTEXT.fillStyle = "white";
  CONTEXT.fillRect(0, 0, 100, 100);
}

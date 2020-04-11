//Developed By: Isaac Robbins
//For Use With: ReFlect

var Clock = {
	now:moment(),
	runner:function(){
		var surface = this.canvas;
		surface.fill("red");
		surface.text({
			text:JSON.stringify(this.Time.getCurrentTime()),
			x:0,
			y:20,
			color:"white"
		});
	}
}

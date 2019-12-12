//Developed By: Isaac Robbins
//For Use With: ReFlect

var Clock = {
	Date:{
		days:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		months:["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		getCurrentDate:function(){
			var d = new Date();
			return {
				year:d.getFullYear(),
				month:d.getMonth(),
				weekOfYear:d.getWeek(),
				dayOfWeek:d.getDay(),
				dayOfMonth:d.getDate(),
				monthName:this.Date.months[d.getMonth()],
				dayName:this.Date.days[d.getDay()]
			};
		},
		getDateString:function(){
			return new Date();
		}
	},
	Time:{
		getCurrentTime:function(){
			var d = new Date();
			return {
				hour:d.getHours(),
				minute:d.getMinutes(),
				second:d.getSeconds(),
				millisecond:d.getMilliseconds()
			};
		}
	},
	runner:function(){
		//console.log(this.Time.getCurrentTime());
	}
}

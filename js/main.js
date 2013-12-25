$(document).ready(function(){
	
	// The official Timer, woohoo!
	window.getRemainingSeconds = function() {
		return ((new Date(2050, 1, 1, 4, 20, 00).valueOf() / 1000) - Math.floor(new Date().valueOf() / 1000)) % (60 * 60 * 12)
	};

	window.translateTime = function(givenSeconds) {
		var hours = Math.floor(givenSeconds / 3600);
		var minutes = Math.floor((givenSeconds / 60) % 60);
		var seconds = givenSeconds % 60;

		var timeArray = [hours, minutes, seconds].map(function(t){
			if (t < 10) {
				var st = "0" + t;
			} else {
				var st = t.toString();
			}

			return st;
		})

		var timeString = timeArray[0] + ":" + timeArray[1] + ":" + timeArray[2];

		return timeString; 
	}

	window.countdownTimer = setInterval(function(){
		console.log(translateTime(getRemainingSeconds()));
	}, 300)

})
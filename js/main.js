var Countdown = this.Countdown = (this.Countdown || {});

(function(global){ // Countdown Timer
	var CountdownTimer = global.CountdownTimer = function($element){
		this.$element = $element;
		this.accuracy = 100; // milliseconds per update time
		this.initialize();
	};

	CountdownTimer.prototype.getRemainingSeconds = function() {
		return ((new Date(2050, 1, 1, 4, 20, 00).valueOf() / 1000) - Math.floor(new Date().valueOf() / 1000)) % (60 * 60 * 12)
	};

	CountdownTimer.prototype.translateTime = function(givenSeconds) {
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
	};

	CountdownTimer.prototype.replaceTime = function (newTime) {
		this.$element.html(newTime);
	};

	CountdownTimer.prototype.step = function(){
		var remainingSeconds = this.getRemainingSeconds();
		var timeString = this.translateTime(remainingSeconds);
		this.replaceTime(timeString);
	};

	CountdownTimer.prototype.initialize = function(){
		var that = this;
		window.countdownTimer = setInterval(that.step.bind(that), that.accuracy);
	};
})(Countdown)


$(document).ready(function(){
	new Countdown.CountdownTimer($('#countdown-wrapper'));
})
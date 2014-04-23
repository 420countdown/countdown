var Countdown = this.Countdown = (this.Countdown || {});

(function(global){ // Countdown Timer
	var CountdownTimer = global.CountdownTimer = function($element){
		this.$element = $element;
		this.accuracy = 100; // milliseconds per update time
		this.initialize();
		this.seconds = 1;
	};

	CountdownTimer.prototype.getRemainingSeconds = function() {
		// this.seconds = ((new Date(2050, 1, 1, 4, 20, 00).valueOf() / 1000) - Math.floor(new Date().valueOf() / 1000)) % (60 * 60 * 12);

		// Compare two, choose whichever is closer.
		var now = new Date();
		var morningTwenty = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 4, 20, 00);
		var afternoonTwenty = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 20, 00);
		var morrowTwenty = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 4, 20, 00);

		// determine which is next
		var first = morningTwenty - now;
		var second = afternoonTwenty - now;
		var third = morrowTwenty - now;

		// return the first time that is in the future
		var remainingTimes = [first, second, third];
		for (var i = 0; i < remainingTimes.length; i++) {
			remainingSeconds = remainingTimes[i]
			if(remainingSeconds > 0) {
				return Math.round(remainingSeconds / 1000)
			}
		}
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
		// Kind of a cool effect, leave it here in case it's wanted in the future.
		// this.$element.textEffect('jumble');
	};

	CountdownTimer.prototype.step = function(){
		var remainingSeconds = this.getRemainingSeconds();
		var timeString = this.translateTime(remainingSeconds);
		this.replaceTime(timeString);
	};

	CountdownTimer.prototype.stop = function() {
		var that = this;
		clearInterval(that.countdownTimer);
	}

	CountdownTimer.prototype.initialize = function(){
		var that = this;
		this.countdownTimer = setInterval(that.step.bind(that), that.accuracy);
	};
})(Countdown)
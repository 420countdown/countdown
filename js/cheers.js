var Countdown = this.Countdown = (this.Countdown || {});

(function(global){
	var Cheers = global.Cheers = function (countdownTimer) {
		this.ct = countdownTimer;
		this.initialize();
	};

	Cheers.prototype.chooseAudioFile = function(){
		var randNum = Math.floor(Math.random() * 25) + 1;
		this.$audioFile = $("<audio src='../audio/timeout_audio" + randNum + ".mp3'>");
	};

	Cheers.prototype.toast = function(){
		this.$audioFile[0].play
	};

	Cheers.prototype._isTimedOut = function(){
		return (this.ct.seconds == 0 ? true : false)
	};

	Cheers.prototype.initialize = function(){
		var that = this;

		this.chooseAudioFile();
		global.cheersTimer = setInterval(function(){
			if (that._isTimedOut()) {
				that.toast();
			}
		}, 850);
	};
})(Countdown)
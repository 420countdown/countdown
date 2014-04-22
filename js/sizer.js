var Countdown = this.Countdown = (this.Countdown || {});

(function(global){

	var Sizer = global.Sizer = function () {
		this.initialize();
	}

	Sizer.prototype.initialize = function () {
		this.horizontalFixEls = [
			'header-bar-iamge'
		]

		this.resizeHorizontals();
	}

	Sizer.prototype.resizeHorizontals = function () {
		this.horizontalFixEls.forEach(function (el) {
			$('#' + el).width( $(window).width() - 1 );
		})
	}

})(Countdown)
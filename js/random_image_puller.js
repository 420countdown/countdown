var Countdown = this.Countdown = (this.Countdown || {});

(function(global){
	var RandomImagePuller = global.RandomImagePuller = function ($el1, $el2) {
		this.$el1 = $el1;
		this.$el2 = $el2;
		// this.initialize();
		this.imageChangeDuration = 2500;
	};

	RandomImagePuller.prototype.getLocation = function(){
		return 'http://420-weed.jpg.to/r?' + Math.random();
	};

	RandomImagePuller.prototype.modifyImage = function($el, loc){
		$el.attr('src', loc);
	};

	RandomImagePuller.prototype.initialPopulation = function(){
		var imgLoc1 = this.getLocation();
		var imgLoc2 = this.getLocation();

		this.modifyImage(this.$el1, imgLoc1);
		this.modifyImage(this.$el2, imgLoc2);
	};

	RandomImagePuller.prototype.step = function(){
		var that = this;
		var elArray = [that.$el1, that.$el2];

		var imgLoc = that.getLocation();
		var $el = elArray[Math.round(Math.random())]
		this.modifyImage($el, imgLoc);
	};

	RandomImagePuller.prototype.initialize = function(){
		var that = this;

		this.initialPopulation();

		window.imageInterval = setInterval(that.step.bind(that), that.imageChangeDuration);
	};
})(Countdown)
var Countdown = this.Countdown = (this.Countdown || {});

(function(global){
	var RandomImagePuller = global.RandomImagePuller = function ($el1, $el2) {
		this.$el1 = $el1;
		this.$el2 = $el2;
		// this.initialize();
		this.imageChangeDuration = 2500;
	};

	RandomImagePuller.prototype._getLocation = function(){
		return 'http://420-weed.jpg.to/r?' + Math.random();
	};

	RandomImagePuller.prototype._modifyImage = function($el, loc){
		$el.attr('src', loc);
	};

	RandomImagePuller.prototype.assignImage = function($el) {
		var that = this;
		var src = this._getLocation();
		var img = new Image();
		img.onload = function(){ that._modifyImage($el, src) };
		img.onerror = function(){ that.assignImage($el) };
		img.src = src;
	};

	RandomImagePuller.prototype.initialPopulation = function(){
		this.assignImage(this.$el1)
		this.assignImage(this.$el2)
	};

	RandomImagePuller.prototype.step = function(){
		var elArray = [this.$el1, this.$el2];
		var $el = elArray[Math.round(Math.random())]
		this.assignImage($el);
	};

	RandomImagePuller.prototype.initialize = function(){
		var that = this;
		this.initialPopulation();
		window.imageInterval = setInterval(that.step.bind(that), that.imageChangeDuration);
	};
})(Countdown)
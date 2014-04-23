var Countdown = this.Countdown = (this.Countdown || {});

(function(global){
	var RandomImagePuller = global.RandomImagePuller = function () {
		this.elements = [].slice.call(arguments, 0);
		this.fadeDuration = 400;
		// this.initialize();
		this.imageChangeDuration = 2500;
		this.imageSources = [
			'http://concentrate-marijuana-420.jpg.to/r?',
			'http://420-weed.jpg.to/r?'
		]
	};

	RandomImagePuller.prototype._random = function (array) {
		return array[ Math.round(Math.random() * (array.length - 1)) ]
	};

	RandomImagePuller.prototype._getLocation = function(){
		source = this._random(this.imageSources)
		return source + Math.random();
	};

	RandomImagePuller.prototype._modifyImage = function($el, loc){
		var that = this;
		$el.fadeOut(that.fadeDuration, function() {
			$el.attr('src', loc);
			$el.fadeIn();
		});
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
		var that = this;
		this.elements.forEach(function (el) {
			that.assignImage(el);
		})
	};

	RandomImagePuller.prototype.step = function(){
		var $el = this._random(this.elements)
		this.assignImage($el);
	};

	RandomImagePuller.prototype.initialize = function(){
		var that = this;
		this.initialPopulation();
		window.imageInterval = setInterval(that.step.bind(that), that.imageChangeDuration);
	};
})(Countdown)
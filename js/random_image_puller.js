var Countdown = this.Countdown = (this.Countdown || {});

(function(global){
	var RandomImagePuller = global.RandomImagePuller = function () {
		this.$elements = [].slice.call(arguments, 0);
		this.fadeDuration = 400;
		this.imageChangeDuration = 2500;
		this.imageUrl = '.jpg.to';
		this.imageKeywords = [
			'Weed',
			'Ganja',
			'Marijuana',
			'Dope',
			'Joint',
			'Blunt',
			'Maryjane',
			'Bho',
			'Concentrate',
			'Herb',
			'Kush',
			'Hippie',
			'PurpleHaze',
			'StonerChick',
			'THCFinder'
		];
		this._assignHoverListenersToEls();
		this.initialize();
	};

	RandomImagePuller.prototype._assignHoverListenersToEls = function() {
		this.$elements.forEach(function ($el) {
			$el.hover(
				function (e) {
					$el.toggleClass('hovered', true);
				},
				function (e) {
					$el.toggleClass('hovered', false);
				}
			)
		})
	};

	RandomImagePuller.prototype.canChange = function ($el) {
		return !$el.hasClass('hovered');
	};

	RandomImagePuller.prototype._random = function (array) {
		return array[ Math.round(Math.random() * (array.length - 1)) ]
	};

	// RandomImagePuller.prototype._getLocation = function(){
	// 	return 'http://' + this._assembleKeywords(this.imageKeywords) + this.imageUrl
	// };

	RandomImagePuller.prototype._textStringToUrl = function (textString) {
		return 'http://' + textString + this.imageUrl
	};

	// The site seems to use && operators between keywords.  So books-tv.jpg.to/r?
	// yields only images of both books AND tv.
	RandomImagePuller.prototype._assembleKeywords = function (keywordArray) {
		/// give back random assembly (hyphened string) of keywords
		// Maybe between 1 and 5 keywords?
		var maxConsecWords = 5;
		var minConsecWords = 2;
		var numConsecWords = minConsecWords + Math.round(Math.random() * (maxConsecWords - minConsecWords));

		var consecWords = this._random(keywordArray);
		for( var i = 1; i < numConsecWords; ++i ){
			consecWords = consecWords + '-' + this._random(keywordArray)
		}

		return consecWords
	};

	RandomImagePuller.prototype._modifyImage = function ($el, loc) {
		var that = this;

		$el.fadeOut(that.fadeDuration, function() {
			$el.attr('src', loc);
			$el.fadeIn();
		});

		$el.unbind('dblclick');
		$el.dblclick(function(){
			// window.open(loc);
			openNewBackgroundTab(loc);
		});
	};

	RandomImagePuller.prototype._modifyImageText = function($el, text) {
		$el.siblings('p').html(text);
	};

	RandomImagePuller.prototype.assignImage = function($el) {
		var that = this;
		var wordString = this._assembleKeywords(this.imageKeywords);
		var src = this._textStringToUrl(wordString);
		var img = new Image();
		img.onload = function(){ 
			that._modifyImage($el, src);
			that._modifyImageText($el, wordString);
		};
		img.onerror = function(){ that._waitAndAssignImage($el) };
		img.src = src;
	};

	RandomImagePuller.prototype._waitAndAssignImage = function ($el) {
		var that = this;
		setTimeout(function() { that.assignImage($el) }, 10);
	};

	RandomImagePuller.prototype.initialPopulation = function(){
		var that = this;
		this.$elements.forEach(function (el) {
			that.assignImage(el);
		})
	};

	RandomImagePuller.prototype.step = function(){
		var that = this;
		var $el = this._random(this.$elements);
		while(!that.canChange($el)){
			$el = that._random(that.$elements);
		}

		this.assignImage($el);
	};

	RandomImagePuller.prototype.stop = function() {
		var that = this;
		clearInterval(that.imageInterval)
	};

	RandomImagePuller.prototype.initialize = function(){
		var that = this;
		this.initialPopulation();
		this.imageInterval = setInterval(that.step.bind(that), that.imageChangeDuration);
	};
})(Countdown)

// Some helpers

function openNewBackgroundTab (loc) {
    var a = document.createElement("a");
    a.href = loc;
    var evt = document.createEvent("MouseEvents");
    //the tenth parameter of initMouseEvent sets ctrl key
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
                                true, false, false, false, 0, null);
    a.dispatchEvent(evt);
}

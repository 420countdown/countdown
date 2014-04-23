var Countdown = this.Countdown = (this.Countdown || {});

$(document).ready(function(){
	var ct = window.ct = new Countdown.CountdownTimer($('#countdown-wrapper'));
	new Countdown.Cheers(ct);
	window.rip = new Countdown.RandomImagePuller($('#random-image-1'), $('#random-image-2'));

	// Fixers for sizes of things
	new Countdown.Sizer()
})

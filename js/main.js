var Countdown = this.Countdown = (this.Countdown || {});

$(document).ready(function(){
	var ct = window.ct = new Countdown.CountdownTimer($('#countdown-wrapper'));
	new Countdown.Cheers(ct);
	window.rip = new Countdown.RandomImagePuller($('#random-weed-image-1'), $('#random-weed-image-2'));
	rip.initialize();
})
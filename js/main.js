var Countdown = this.Countdown = (this.Countdown || {});

$(document).ready(function(){
	window.ct = new Countdown.CountdownTimer($('#countdown-wrapper'));
	window.ch = new Countdown.Cheers(window.ct);
	window.rip = new Countdown.RandomImagePuller($('#random-image-1'), $('#random-image-2'));

	// Fixers for sizes of things
	new Countdown.Sizer()

	// Jumble the footer when the page loads
	$('#footer').textEffect('jumble');
})

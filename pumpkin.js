document.onkeypress = function (e) {
	var audio_w = new Audio('sounds/mandolin_Am.mp3');
	var audio_a = new Audio('sounds/mandolin_C.mp3');
	var audio_s = new Audio('sounds/mandolin_D.mp3');
	var audio_d = new Audio('sounds/mandolin_D7.mp3');
	
	switch(e.key) {
		case "w":
			audio_w.play();
			break;
		case "a":
			audio_a.play();
			break;
		case "s":
			audio_s.play();
			break;
		case "d":
			audio_d.play();
			break;
	}
};
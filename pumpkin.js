
document.onkeydown = checkKey;

function checkKey(e) {
	var mandolin_Am = new Audio('sounds/mandolin/mandolin_Am.mp3');
	var mandolin_C = new Audio('sounds/mandolin/mandolin_C.mp3');
	var mandolin_D = new Audio('sounds/mandolin/mandolin_D.mp3');
	var mandolin_D7 = new Audio('sounds/mandolin/mandolin_D7.mp3');

	var drums_kick = new Audio('sounds/drums/Kick.mp3');
	var drums_snare = new Audio('sounds/drums/Snare.mp3');
	var drums_hihat = new Audio('sounds/drums/HiHatClosed.mp3');
	var drums_crash = new Audio('sounds/drums/CymbalCrash.mp3');

	e = e || window.event;

	//console.log(e.keyCode);
	switch (e.keyCode) {
		case 38:
			console.log('up');
			drums_kick.play();
			break;
		case 40:
			console.log('down');
			drums_snare.play();
			break;
		case 37:
			console.log('left');
			drums_hihat.play();
			break;
		case 39:
			console.log('right');
			drums_crash.play();
			break;
		case 32:
			console.log('space bar');

			break;
		case 13:
			console.log('enter');

			break;
		case 87:
			console.log('w');
			mandolin_Am.play();
			break;
		case 65:
			console.log('a');
			mandolin_C.play();
			break;
		case 83:
			console.log('s');
			mandolin_D.play();
			break;
		case 68:
			console.log('d');
			mandolin_D7.play();
			break;
		case 70:
			console.log('f');

			break;
		case 71:
			console.log('g');

			break;
	}
}


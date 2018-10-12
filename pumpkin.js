
window.onload = function () {
	var sounds = [
	"mandolin/Am", "mandolin/C", "mandolin/D", "mandolin/D7", "mandolin/Am",
	"drums/Kick", "drums/Snare", "drums/HiHatClosed", "drums/CymbalCrash", "drums/CymbalRide", "drums/SnareSideStick"];

	// populate menus with sound options
	var menus = document.getElementsByClassName("menu");
	for (var m = 0; m < menus.length; m++) { 
		var menu = menus[m];
		for (var i = 0; i < sounds.length; i++) { 
			var option = document.createElement("option");
			option.text = sounds[i];
			menu.options.add(option, i);
		}
		menu.selectedIndex = m;
	}

	var bandNames = ["Touch the Pumpkins", "Pumpkin Parade", "Pumpkin Chuckin'", "Smacking Pumpkins", "The Pumpkings"];
	var bandIndex = Math.floor(Math.random() * Math.floor(bandNames.length));
	document.getElementById("band_name").innerHTML = bandNames[bandIndex];
}

document.onkeydown = checkKey;

function checkKey(e) {
	e = e || window.event;

	var id = "";
	//console.log(e.keyCode);
	switch (e.keyCode) {
		case 38:
			console.log('up');
			id = "select_up";
			break;
		case 40:
			console.log('down');
			id = "select_down";
			break;
		case 37:
			console.log('left');
			id = "select_left";
			break;
		case 39:
			console.log('right');
			id = "select_right";
			break;
		case 32:
			console.log('space');
			id = "select_space";
			break;
		case 13:
			console.log('enter');

			break;
		case 87:
			console.log('w');
			id = "select_w";
			break;
		case 65:
			console.log('a');
			id = "select_a";
			break;
		case 83:
			console.log('s');
			id = "select_s";
			break;
		case 68:
			console.log('d');
			id = "select_d";
			break;
		case 70:
			console.log('f');
			id = "select_f";
			break;
		case 71:
			console.log('g');
			id = "select_g";
			break;
	}

	if (id.length > 0)
	{
		elem = document.getElementById(id);
		var soundName = elem.options[elem.selectedIndex].text;
		console.log(soundName);
		var sound = new Audio('sounds/' + soundName + '.mp3');
		sound.play();
	}
}


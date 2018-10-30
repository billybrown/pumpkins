var preloadedSounds = {};
var thTags;
var bg;

window.onload = function () {
	
	bg = new Howl({
		src: ["/raw-mash/Monster Mash-Master Mix.mp3"]
	});
	
	// NOTE: each dictionary key is the folder name, each dictionary value is an array of filenames within the folder
	var sounds = {
		"mandolin": ["Am", "C", "D", "D7", "Am"],
		"drums": ["Kick", "HiHatClosed", "Snare", "CymbalCrash", "CymbalRide", "SnareSideStick"],
		"guitar": ["G-short", "G-long", "Em-short", "Em-long", "C-short", "C-long", "D-short", "D-long"],
		"xylo": ["xylo-C-lo", "xylo-D", "xylo-E", "xylo-F", "xylo-G", "xylo-A", "xylo-B", "xylo-C-hi"],
		"pumpkin": ["slap", "tap", "deep-slap"],
		"halloween": ["bubbling", "cat", "ghost", "laugh", "scream", "witch", "wolf"]
	};
	
	// find elements to flash when triggered
	thTags = document.getElementsByTagName("th");
	
	// pre-load all sound clips
	for (var group in sounds)
	{
		var s = sounds[group];
		for (var i = 0; i < s.length; i++) {
			var id = group + "/" + s[i];
			preloadedSounds[id] = new Howl({
			  src: ['sounds/' + id + ".mp3"]
			});
		}
	}
	
	// populate menus with sound options
	var menus = document.getElementsByClassName("menu");
	for (var m = 0; m < menus.length; m++) { 
		var menu = menus[m];

		for (var group in sounds)
		{
			// show keys as option group headings
			var optgroup = document.createElement("optgroup");
			optgroup.label = group;
			menu.options.add(optgroup, menu.options.length);

			var s = sounds[group];
			for (var i = 0; i < s.length; i++) {
				var option = document.createElement("option");
				option.text = s[i];
				option.data = group + "/" + s[i];
				menu.options.add(option, menu.options.length);
			}
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

	var key = "";
	var visual = "pumpkin";
	console.log(e.keyCode);
	switch (e.keyCode) {
		case 38:
			key = "up";
			visual = "bat";
			break;
		case 40:
			key = "down";
			visual = "candle";
			break;
		case 37:
			key = "left";
			visual = "coffin";
			break;
		case 39:
			key = "right";
			visual = "frank";
			break;
		case 32:
			key = "space";
			visual = "ghost";
			break;
		case 13:
			key = "enter";
			visual = "grave";
			break;
		case 81:
			key = "q";
			visual = "hat";
			break;
		case 87:
			key = "w";
			visual = "house";
			break;
		case 69:
			key = "e";
			visual = "pot";
			break;
		case 82:
			key = "r";
			visual = "pumpkin-1";
			break;
		case 84:
			key = "t";
			visual = "pumpkin-2";
			break;
		case 89:
			key = "y";
			visual = "raven";
			break;
		case 65:
			key = "a";
			visual = "reaper";
			break;
		case 83:
			key = "s";
			visual = "skull";
			break;
		case 68:
			key = "d";
			visual = "spider-web";
			break;
		case 70:
			key = "f";
			visual = "vampire-1";
			break;
		case 71:
			key = "g";
			visual = "vampire-2";
			break;
		case 72:
			key = "h";
			visual = "scarecrow";
			break;
	}

	console.log('key: ' + key);
	if (key.length > 0)
	{
		elem = document.getElementById('sound_' + key);
		var soundName = elem.options[elem.selectedIndex].data;
		console.log(soundName);
		var volume = document.getElementById('volume_' + key).value;
		var pan = document.getElementById('pan_' + key).value;
		preloadedSounds[soundName].play();

		// TODO: can/should we set these values on change instead of every play?
		// if more than one key is mapped to the same sound, then there might be some problems... 
		preloadedSounds[soundName].volume(volume / 100);
		preloadedSounds[soundName].stereo(pan / 50);
		
		// Flash pressed key UI
		for (var i = 0; i < thTags.length; i++) {
		  if (thTags[i].textContent == key) {
			thTags[i].setAttribute("class","flash");
			setTimeout(function() {
		        thTags[i].setAttribute("class","");
		    }, 100);
		    break;
		  }
		}

		// deploy visual
		var visual_dom = document.getElementById(visual);
		visual_dom.className += " go";
		setTimeout(function(){ visual_dom.classList.remove("go"); },200);
	}
}


function changeTextValue(newVal, idToChange)
{
	document.getElementById(idToChange).innerHTML = newVal;
}

function showAdvanced(cb) {
  var elements = document.getElementsByClassName("advanced_options");
	for (var e = 0; e < elements.length; e++) { 
		var elem = elements[e];

		if (cb.checked)
		{
			elem.style.display = 'table-row';
		}
		else
		{
			elem.style.display = 'none';
		}
	}
}

var playing = false;
function playBackingTrack(button) {
	// TODO fix
	if(playing)
		return;
	
	button.innerHTML = "Playing...";
	
	playing = true;
	bg.play();
}

function toggleDisplay(cb) {
	if (document.getElementById("visuals").classList.contains("hidden")) {
		document.getElementById("controls").setAttribute("class","hidden");
		document.getElementById("visuals").setAttribute("class","");
		document.getElementById("switch-button").textContent='Show Controls';
	} else {
		document.getElementById("controls").setAttribute("class","");
		document.getElementById("visuals").setAttribute("class","hidden");
		document.getElementById("switch-button").textContent='Show Visuals';
	}
}

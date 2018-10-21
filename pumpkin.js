var preloadedSounds = {};
var thTags;

window.onload = function () {

	// NOTE: each dictionary key is the folder name, each dictionary value is an array of filenames within the folder
	var sounds = {
		"mandolin": ["Am", "C", "D", "D7", "Am"],
		"drums": ["Kick", "HiHatClosed", "Snare", "CymbalCrash", "CymbalRide", "SnareSideStick"]
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
	console.log(e.keyCode);
	switch (e.keyCode) {
		case 38:
			key = "up";
			break;
		case 40:
			key = "down";
			break;
		case 37:
			key = "left";
			break;
		case 39:
			key = "right";
			break;
		case 32:
			key = "space";
			break;
		case 13:
			key = "enter";
			break;
		case 87:
			key = "w";
			break;
		case 65:
			key = "a";
			break;
		case 83:
			key = "s";
			break;
		case 68:
			key = "d";
			break;
		case 70:
			key = "f";
			break;
		case 71:
			key = "g";
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

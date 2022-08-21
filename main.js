var intervalID = window.setInterval(checkPlayerStartup, 500);
var video;

function checkPlayerStartup(){
	video = document.getElementsByClassName("rmp-video")[0]; // Get video

	if (video !== undefined){
		// Video player loaded
		clearInterval(intervalID);
		runEnhancements();
	}  
}

function runEnhancements(){
	var containerOptions = document.getElementById("containerOptions");

	// Slow down video
	var slowDownButton = document.createElement("a");
	slowDownButton.innerText = "ABRANDAR";
		var slowDownButtonIcon = document.createElement("i");
		slowDownButtonIcon.className = "fal fa-turtle";
		slowDownButton.prepend(slowDownButtonIcon);
	slowDownButton.onclick = function(event){
		event.preventDefault();
		video.playbackRate -= 0.25;
		playbackRateIndicator.update();
	};
	containerOptions.append(slowDownButton);

	// Video playback rate indicator
	var playbackRateIndicator = document.createElement("a");
	playbackRateIndicator.id = "playbackRateIndicator";
	playbackRateIndicator.innerText = "1x";
		var playbackRateIndicatorIcon = document.createElement("i");
		playbackRateIndicatorIcon.className = "fal fa-tachometer-alt-average";
		playbackRateIndicator.prepend(playbackRateIndicatorIcon);
	playbackRateIndicator.onclick = function(event){
		event.preventDefault();
		video.playbackRate = 1;
		playbackRateIndicator.update();
	};
	playbackRateIndicator.update = function(){
		this.innerText = video.playbackRate + "x";

		if (video.playbackRate < 0.5){
			var playbackRateIndicatorIcon = document.createElement("i");
			playbackRateIndicatorIcon.className = "fal fa-tachometer-alt-slowest";
			playbackRateIndicator.prepend(playbackRateIndicatorIcon);
		} else if (video.playbackRate < 1){
			var playbackRateIndicatorIcon = document.createElement("i");
			playbackRateIndicatorIcon.className = "fal fa-tachometer-alt-slow";
			playbackRateIndicator.prepend(playbackRateIndicatorIcon);
		} else if (video.playbackRate == 1){
			var playbackRateIndicatorIcon = document.createElement("i");
			playbackRateIndicatorIcon.className = "fal fa-tachometer-alt-average";
			playbackRateIndicator.prepend(playbackRateIndicatorIcon);
		} else if (video.playbackRate <= 1.5){
			var playbackRateIndicatorIcon = document.createElement("i");
			playbackRateIndicatorIcon.className = "fal fa-tachometer-alt-fast";
			playbackRateIndicator.prepend(playbackRateIndicatorIcon);
		} else if (video.playbackRate > 1.5){
			var playbackRateIndicatorIcon = document.createElement("i");
			playbackRateIndicatorIcon.className = "fal fa-tachometer-alt-fastest";
			playbackRateIndicator.prepend(playbackRateIndicatorIcon);
		} else {
			var playbackRateIndicatorIcon = document.createElement("i");
			playbackRateIndicatorIcon.className = "fal fa-tachometer-alt-average";
			playbackRateIndicator.prepend(playbackRateIndicatorIcon);
		}
	};
	containerOptions.append(playbackRateIndicator);

	// Speed up video
	var speedUpButton = document.createElement("a");
	speedUpButton.innerText = "ACELERAR";
		var speedUpButtonIcon = document.createElement("i");
		speedUpButtonIcon.className = "fal fa-rabbit-fast";
		speedUpButton.prepend(speedUpButtonIcon);
	speedUpButton.onclick = function(event){
		event.preventDefault();
		video.playbackRate += 0.25;
		playbackRateIndicator.update();
	};
	containerOptions.append(speedUpButton);

	// Download Button
	var downloadButton = document.createElement("a");
	downloadButton.innerText = "DOWNLOAD";
		var downloadButtonIcon = document.createElement("i");
		downloadButtonIcon.className = "fal fa-file-download";
		downloadButton.prepend(downloadButtonIcon);
	downloadButton.href = "https://streaming-ondemand.rtp.pt" + window.wrappedJSObject.player1.fileKey;
	downloadButton.target = "_blank";
	containerOptions.append(downloadButton);

	// Countdown
	var countdownDisplay = document.getElementsByClassName("rmp-duration")[0];
	countdownDisplay.innerText = "-00:00";
	countdownDisplay.update = function(){ countdownDisplay.innerText = "-" + humanTime(video.duration - video.currentTime); };
	video.addEventListener('timeupdate', countdownDisplay.update);
}

function humanTime(seconds){
	return new Date(seconds * 1000).toISOString().substr(11, 8);
}

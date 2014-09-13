var audio = new Audio();
audio.src = 'light.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = true;

var canvas, ctx, source, context, analyzer, FBCArray, bars, barX, barWidth, barHeight;

window.addEventListener("load", initMP3Player, false);

function initMP3Player() {
	//document.getElementById('audio-box').appendChild(audio);
	context = new AudioContext();
	analyzer = context.createAnalyser();
	canvas = document.getElementById('analyser');
	canvas.width = 100;
	ctx = canvas.getContext('2d');

	source = context.createMediaElementSource(audio);
	source.connect(analyzer);
	analyzer.connect(context.destination);
	frameLooper();
}

function frameLooper() {
	window.requestAnimationFrame(frameLooper);
	FBCArray = new Uint8Array(analyzer.frequencyBinCount);
	analyzer.getByteFrequencyData(FBCArray);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#eee';
	ctx.fillRect(0, 0, audio.currentTime / audio.duration * 100, canvas.height);
	ctx.fillStyle = '#ddd';
	bars = 20;
	for (var i = 0; i < bars; i++) {
		barX = i * 5;
		barWidth = 3;
		barHeight = -(FBCArray[i * 5] / 2);
		ctx.fillRect(barX, canvas.height, barWidth, barHeight);
	}
}
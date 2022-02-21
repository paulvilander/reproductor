const $video = document.querySelector("#video");
const $play = document.querySelector("#play");
const $pause = document.querySelector("#pause");
const $backward = document.querySelector("#backward");
const $forward = document.querySelector("#forward");
const $mute = document.querySelector("#mute");
const $speaker = document.querySelector("#speaker");
const $progress = document.querySelector("#progress");
const $volumen = document.querySelector("#volumen");
const $overlay = document.querySelector(".player-overlay");

$video.addEventListener("loadedmetadata", handleLoaded);
$video.addEventListener("timeupdate", handleTimeUpdate);
$video.addEventListener(
	"ended",
	() => (($pause.hidden = true), ($play.hidden = false))
);
$play.addEventListener("click", handlePlay);
$pause.addEventListener("click", handlePause);
$backward.addEventListener("click", handleBackward);
$forward.addEventListener("click", handleForward);

$mute.addEventListener("click", handleRemoveMute);
$speaker.addEventListener("mouseenter", handleSpeaker);
$speaker.addEventListener("click", handleMute);
$speaker.addEventListener("mouseenter", handleSpeaker);

$volumen.addEventListener("click", handleVolumen);
$volumen.addEventListener("input", handleVolumenUpdate);
$volumen.addEventListener("mouseleave", () => ($volumen.hidden = true));
$volumen.addEventListener("mouseenter", () => ($volumen.hidden = false));

$progress.addEventListener("input", handleInput);

function handlePlay() {
	$video.play();
	$play.hidden = true;
	$pause.hidden = false;
}
function handlePause() {
	$video.pause();
	$pause.hidden = true;
	$play.hidden = false;
}
function handleForward() {
	$video.currentTime += 10;
}
function handleBackward() {
	$video.currentTime -= 10;
}
function handleSpeaker() {
	$volumen.hidden = false;
	setTimeout(() => {
		$volumen.hidden = true;
	}, 10000);
}
function handleMute() {
	$volumen.value = 0;
	$video.volume = $volumen.value;
	$mute.hidden = false;
	$speaker.hidden = true;
	$mute.title = "Desmutear";
}
function handleRemoveMute() {
	$volumen.value = 0.2;
	$video.volume = $volumen.value;
	$mute.hidden = true;
	$speaker.hidden = false;
}
function handleLoaded() {
	$progress.max = $video.duration;
}
function handleTimeUpdate() {
	$progress.value = $video.currentTime;
}
function handleInput() {
	$video.currentTime = $progress.value;
}
function handleVolumen() {
	$video.volume = $volumen.value;
	$video.volume == 0
		? (($mute.hidden = false), ($speaker.hidden = true))
		: (($mute.hidden = true), ($speaker.hidden = false));
}
function handleVolumenUpdate() {
	$video.volume = $volumen.value;
}

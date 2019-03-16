var isChrome = !!window.chrome;
var isFirefox = typeof InstallTrigger !== "undefined";

var ublChromeLink =
	"https://chrome.google.com/webstore/detail/cjpalhdlnbpafiamejdnhcphjbkeiagm";
var ublFirefoxLink =
	"https://addons.mozilla.org/firefox/downloads/file/1580486/ublock_origin-1.18.2-an+fx.xpi?src=dp-btn-primary";

var tampChromeLink =
	"https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo";
var tampFirefoxLink =
	"https://addons.mozilla.org/firefox/downloads/file/1076900/tampermonkey-4.8.5847-an+fx.xpi?src=dp-btn-primary";

if (isChrome) {
	// document.getElementById("downloadTampermonkey").href = tampChromeLink;
	$("#downloadTampermonkey").attr("href", tampChromeLink);
	$("#downloadTampermonkey").attr("target", "_blank");

	$("#downloadUblock").attr("href", ublChromeLink);
	$("#downloadUblock").attr("target", "_blank");
}
if (isFirefox) {
	// document.getElementById("downloadTampermonkey").href = tampFirefoxLink;
	$("#downloadTampermonkey").attr("href", tampFirefoxLink);

	$("#downloadUblock").attr("href", ublFirefoxLink);
}

function initInstall() {
	$(window).on("focus", function() {
		// Code to open next script
	});
}

var fitgirl = "http://fitgirl-repacks.site/?s=";
var fmovies = "https://fmovies.to/search?keyword=";
var yourmovie = "http://www.yourmovie.org/?s=";
var pahe = "https://pahe.in/?s=";
var _1337x = "https://1337x.to/search/";

$("form").submit(function(e) {
	e.preventDefault();
	var id = $(this)
		.find("span:first")
		.html()
		.toLowerCase();
	var value = $(this)
		.find("input:first")
		.val();
	if (id == "1337x") {
		id = "_1337x";
		if (value) {
			value = value + "/1/";
		}
	}
	var link = eval(id);
	if (value) {
		window.open(link + value, "_blank");
	}
});

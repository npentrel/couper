console.log("Listall.js is called.");

// Run the initialisation script
init();

function init() {
	// Getting the vendor and showing the voucher codes
	displayAllCodes(getVendor());

	// Initialising clipboard JS
	initClipboard();
}

function initClipboard() {
	// Declaring as global variable
	clipboard = new Clipboard('.btn');
}
clipboard.on('success', function(e) {
	console.info('Action:', e.action);
	console.info('Text:', e.text);
	console.info('Trigger:', e.trigger);

	//TODO: Add a notification if the code has been copied successfully

	e.clearSelection();
});
clipboard.on('error', function(e) {
	console.error('Action:', e.action);
	console.error('Trigger:', e.trigger);
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getVendor() {
	// Returns the seller.
	var vendor = getParameterByName("v", window.location.href);
	return vendor;
}

function displayAllCodes(vendor) {
	// Vendor is the seller like amazon / boots
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://getcouper.com:5000/" + vendor, false);
	xhr.send();
	var result = xhr.responseText;

	var json = JSON.parse(result);

	//TODO: Fix XSS vulnerability.
	$(document).ready(function () {
		// Index variable for adding an ID to each of the voucher code <td> cells.
		var couponIndex = 0;
		var tr;
		for (var a in json) {
			tr = $('<tr/>');
			tr.append("<td id='c" + couponIndex + "'>" + a + "</td>");
			tr.append("<td>" + json[a] + "</td>");
			tr.append("<td> <button class='btn tooltipped'  data-clipboard-text='" + a + "'><img class='buttClipboard' src='img/clippy.svg' alt='Copy' ></button></td>")

			couponIndex++;

			$('table').append(tr);
		}
	});
}

console.log("Listall.js is called.");
//console.log(getParameterByName("v", window.location.href));

// Getting the vendor
displayAllCodes(getVendor());
// Calling the function to display all the voucher codes.

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

	$(document).ready(function () {
		var tr;
		for (var a in json) {
			tr = $('<tr/>');
			tr.append("<td>" + a + "</td>");
			tr.append("<td>" + json[a] + "</td>");
			$('table').append(tr);
		}
	});
}

//var text = document.createTextNode(result);
//var child = document.getElementById('table');
//child.parentNode.insertBefore(text, child);

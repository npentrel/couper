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

	//TODO: Fix XSS vulnerability.
	$(document).ready(function () {
		// Index variable for adding an ID to each of the voucher code <td> cells.
		var couponIndex = 0;
		var tr;
		for (var a in json) {
			tr = $('<tr/>');
			tr.append("<td id='c" + couponIndex + "'>" + a + "</td>");
			tr.append("<td>" + json[a] + "</td>");
			//tr.append("<td> <button class='btn'  data-clipboard-text='" + a + "' data-clipboard-target='#c" + couponIndex + "'><img class='buttClipboard' src='img/clippy.svg' alt='Copy' ></button></td>");
			tr.append("<td> <button class='btn'  data-clipboard-text='" + a + "'><img class='buttClipboard' src='img/clippy.svg' alt='Copy' ></button></td>")
			couponIndex++;

			$('table').append(tr);
		}
	});
}

//var text = document.createTextNode(result);
//var child = document.getElementById('table');
//child.parentNode.insertBefore(text, child);

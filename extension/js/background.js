chrome.contextMenus.create({
    'title': 'Insert Best Coupon',
    'contexts': ['editable'],
    'onclick': onClickInsertHandler
});


// Load text with Ajax synchronously: takes path to file and optional MIME type
function loadTextFileAjaxSync(filePath, mimeType) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET",filePath,false);
	if (mimeType != null) {
		if (xmlhttp.overrideMimeType) {
			xmlhttp.overrideMimeType(mimeType);
		}
	}
	xmlhttp.send();
	if (xmlhttp.status==200) {
		return xmlhttp.responseText;
	} else {
		// TODO Throw exception
		return null;
	}
}


function onClickInsertHandler(info) {
    
    // Need to send a message with the voucher code 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    
    	chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
			//console.log(response.farewell);
			
			// The returned voucher code
			var selectedVoucherCode = "";
			
			// The URL of the voucher server
			var voucherURL = "http://61c7b7a6.ngrok.io/" + response.farewell;
			console.log("Voucher url: " + voucherURL);
			
			// Loading all the remote voucher codes.			
			selectedVoucherCode = loadTextFileAjaxSync(voucherURL, "application/json");
			
			chrome.tabs.sendMessage(tabs[0].id, {voucherCode: selectedVoucherCode}, function(response) {
				console.log(response.farewell);
			
			});
			
			
		});
		
		
    
    });
	
}

chrome.contextMenus.create({
    'title': 'Find All Coupons',
    'contexts': ['link', 'editable'],
    'onclick': onClickListAllHandler
});

function onClickListAllHandler(info) {
	console.log("All");
    chrome.windows.create({url: 'listall.html', type: 'popup', width: 300, height: 500}, function () {
        chrome.runtime.sendMessage({details: details}, function (response) {
        });
    });
}

mp();
// setInterval(helloTest, 5000);

function helloTest() {
	/*var elems = document.getElementsByTagName('input');
	for(var i=0; i< elems.length; i++) {
		console.log(elems[i].id);
	}

	var amazonBox = document.getElementById("gcpromoinput");
	amazonBox.value="Hello";*/
	//console.log("Hello world");
	//console.log(document.activeElement.id);
}

function getCurrentElementId() {
	// Returns the ID of the element in focus
	return document.activeElement.id;
}

function setVoucherCode(vc) {
	// Sets the vouchercode in the appropriate text box
	console.log(vc);
	var codeBox = document.getElementById(getCurrentElementId());
	codeBox.value = vc;
}

function mp() {
	/*
		1. Receives a message when the context menu INSERT is activated.
		2. Responds with the hostname of the webpage where the context menu was activated.
		3. Background JS requests the voucher via GET request.
		4. mp() Receives the voucher code.
		5. mp Sets the voucher code in the text box. 
	*/
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			
			//console.log("Element selected: " + document.activeElement.id);
			if (request.voucherCode) {
				console.log(request.voucherCode);
				setVoucherCode(request.voucherCode);
			}
			sendResponse({farewell: window.location.hostname});
		}
	);
}
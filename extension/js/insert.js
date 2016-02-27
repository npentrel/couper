setInterval(helloTest, 5000);

function helloTest() {
	/*var elems = document.getElementsByTagName('input');
	for(var i=0; i< elems.length; i++) {
		console.log(elems[i].id);
	}

	var amazonBox = document.getElementById("gcpromoinput");
	amazonBox.value="Hello";*/
	console.log("Hello world");
	console.log(document.activeElement.id);
}

function getCurrentElementId() {
	// Returns the ID of the element in focus
	return document.activeElement.id;
}
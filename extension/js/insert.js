helloTest();

function helloTest() {
	var elems = document.getElementsByTagName('input');
	for(var i=0; i< elems.length; i++) {
	 console.log(elems[i].id);
	}
	
	var amazonBox = document.getElementById("twotabsearchtextbox");
	amazonBox.value="Hello";
}
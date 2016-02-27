chrome.contextMenus.create({
    'title': 'Insert Best Coupon',
    'contexts': ['editable'],
    'onclick': onClickInsertHandler
});

function onClickInsertHandler(info) {
    
	var elems = document.getElementsByTagName('input');
	for(var i=0; i< elems.length; i++) {
		alert(elems[i].type);
	}
}

chrome.contextMenus.create({
    'title': 'Find All Coupons',
    'contexts': ['link', 'editable'],
    'onclick': onClickListAllHandler
});

function onClickListAllHandler(info) {
    chrome.windows.create({url: 'listall.html', type: 'popup', width: 300, height: 500}, function () {
        chrome.runtime.sendMessage({details: details}, function (response) {
        });
    });
}

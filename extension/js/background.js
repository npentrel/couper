chrome.contextMenus.create({
    'title': 'Insert Best Coupon',
    'contexts': ['editable'],
    'onclick': onClickInsertHandler
});

function onClickInsertHandler(info) {
    alert("Hello, World")
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
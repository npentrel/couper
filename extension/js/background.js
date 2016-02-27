chrome.contextMenus.create({
    'title': 'Insert Best Coupon',
    'contexts': ['link'],
    'onclick': onClickInsertHandler
});

function onClickInsertHandler(info) {
    alert("Hello, World")
}

chrome.contextMenus.create({
    'title': 'Find All Coupons',
    'contexts': ['link'],
    'onclick': onClickListAllHandler
});

function onClickListAllHandler(info) {
    chrome.windows.create({url: 'listall.html', type: 'popup', width: 300, height: 500}, function () {
        chrome.runtime.sendMessage({details: details}, function (response) {
        });
    });
}

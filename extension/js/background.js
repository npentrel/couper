chrome.contextMenus.create({
  'title': 'Insert Best Coupon',
  'contexts': ['link'],
  'onclick': onClickInsertHandler
});

function onClickInsertHandler(info) {

}


chrome.contextMenus.create({
  'title': 'Find All Coupons',
  'contexts': ['link'],
  'onclick': onClickListAllHandler
});

function onClickListAllHandler(info) {
  var details = {};

  details.title = info.selectionText;
  details.url = info.linkUrl;
  details.editable = info.editable;
  details.id = info.menuItemId;
  details.pageUrl = info.pageUrl;
  details.text = info.selectionText;

  chrome.windows.create({ url: 'listall.html', type: 'popup', width: 300, height: 500 }, function() {
    chrome.runtime.sendMessage({ details: details }, function(response) {});
  });
}

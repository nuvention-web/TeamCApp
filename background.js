chrome.runtime.onMessage.addListener(function (msg, sender) {
  if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
    chrome.pageAction.show(sender.tab.id);
  }
});

function addText() {
  chrome.browserAction.setBadgeText({text: '!'});
  chrome.browserAction.setBadgeBackgroundColor({color: "#ff5a5f"});
}

function removeText() {
  chrome.browserAction.setBadgeText({text: ''});
}

// chrome.tabs.onCreated.addListener(woo());
chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
	var urls = ["https://www.amazon.com/gp/cart/view.html/ref=nav_cart"] // Add more URLs
	if (urls.includes(tab.url)) {
		addText()
	}
	else {
		removeText()
	}
});
window.onload.addListener(woo());

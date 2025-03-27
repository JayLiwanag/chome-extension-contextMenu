chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'ChatIA',
        title: 'RCA generator',
        contexts: ['selection']
    });
    chrome.contextMenus.create({
        id: 'showPopup',
        title: 'Popup generator',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === 'ChatIA') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'sendPrompt',
                selectedText: info.selectionText
            });
        });
    }
    if (info.menuItemId === "showPopup") {
        chrome.windows.create({
            url: chrome.runtime.getURL("popup.html"),
            type: "popup",
            width: 600,
            height: 450
        });
    }
});
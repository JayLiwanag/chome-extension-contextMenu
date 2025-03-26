chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'ChatIA',
        title: 'RCA generator',
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
});
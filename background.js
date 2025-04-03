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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'openPopup') {
        // Get the screen dimensions
        const width = 450;
        const height = 600;

        // Get primary screen width and height
        chrome.windows.getAll({ windowTypes: ['normal'] }, (windows) => {
            // Find the rightmost position
            let maxRight = 0;
            windows.forEach(window => {
                maxRight = Math.max(maxRight, window.left + window.width);
            });

            chrome.windows.create({
                url: 'popup.html',
                type: 'popup',
                width: width,
                height: height,
                left: maxRight - width - 20, // 20px offset from right edge
                top: 20, // 20px from top
                focused: true
            });
        });
    }
});
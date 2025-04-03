document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const selectedTextArea = document.getElementById('selectedText');
    const prompt1Area = document.getElementById('prompt1');
    const prompt2Area = document.getElementById('prompt2');
    const prompt3Area = document.getElementById('prompt3');

    // Get data from background script
    chrome.storage.local.get(['selectedText', 'prompt1', 'prompt2', 'prompt3'], function (data) {
        if (data.selectedText) selectedTextArea.value = data.selectedText;
        if (data.prompt1) prompt1Area.value = JSON.stringify(data.prompt1, null, 2);
        if (data.prompt2) prompt2Area.value = JSON.stringify(data.prompt2, null, 2);
        if (data.prompt3) prompt3Area.value = JSON.stringify(data.prompt3, null, 2);
    });
});
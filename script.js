const prompt1JSON = chrome.runtime.getURL('./Prompt/prompt1.json');
const prompt2JSON = chrome.runtime.getURL('./Prompt/prompt2.json');
const prompt3JSON = chrome.runtime.getURL('./Prompt/prompt3.json');
const ruleFile = chrome.runtime.getURL('./Rule.txt');

// Get JSON data from file
async function getJsonData(path) {
    let reponse = await fetch(path);
    let object = await reponse.json();
    return object
}

async function getTextData(path) {
    let reponse = await fetch(path);
    let object = await reponse.text();
    return object
}
// Get Rule JSON data from file
function getRuleJson(ruleFile) {
    let path = chrome.runtime.getURL('./Rules/' + ruleFile);
    let data = getJsonData(path);
    return data;
}

function getMatchData(data, prompt, isPrompt2) {
    let matchData = [];

    if (isPrompt2) {
        data.filter((item) => {
            prompt.filter((item2) => {
                if (item2.ItemID === item.ItemID) {
                    matchData.push(item2);
                }
            });
        });
        return matchData;
    } else {
        data.filter((item) => {
            prompt.filter((item2) => {
                if (item2.ItemID === item) {
                    matchData.push(item2);
                }
            });
        });
        return matchData;
    }
}


// Process and send prompt to ChatAI API
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'sendPrompt') {
        let selectedText = request.selectedText;

        // Store selected text
        chrome.storage.local.set({ selectedText: selectedText });

        let ruleData = await getTextData(ruleFile);
        console.log(ruleData);

        // get promt1 JSON data and store specific item
        let prompt1 = await getJsonData(prompt1JSON);
        let i = Math.floor(Math.random() * (prompt1.length));
        chrome.storage.local.set({ prompt1: prompt1[i] }); // Changed to store specific item

        // get Rule JSON data
        let rule = await getRuleJson(prompt1[i].Rule);
        console.log(prompt1[i]);

        // get promt2 JSON data using rule
        let prompt2 = await getJsonData(prompt2JSON);
        let list_of_valid_product_categories = getMatchData(rule, prompt2, true);

        // get specific product classification and store it
        i = Math.floor(Math.random() * (list_of_valid_product_categories.length));
        chrome.storage.local.set({ prompt2: list_of_valid_product_categories[i] }); // Changed to store specific item

        let ai_product_classification_answer = list_of_valid_product_categories[i];
        console.log(ai_product_classification_answer);

        let root_cause = rule.filter((item) => item.ItemID === ai_product_classification_answer.ItemID)[0].root_cause;
        // console.log(root_cause);

        let prompt3 = await getJsonData(prompt3JSON);
        let list_of_valid_root_cause_categories = getMatchData(root_cause, prompt3, false);
        chrome.storage.local.set({ prompt3: list_of_valid_root_cause_categories }); // Changed to store root cause categories
        console.log(list_of_valid_root_cause_categories);

        // Instead of directly creating window, send message to background script
        chrome.runtime.sendMessage({
            action: 'openPopup'
        });
    }
});
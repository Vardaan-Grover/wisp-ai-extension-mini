async function homePageFlow() { const e = await getCurrentCampaignTabId(), a = await getUnsentUsername(), t = calculateRandomNumber(2e3, 4e3), m = calculateRandomNumber(4e3, 7e3), n = calculateRandomNumber(3e3, 5e3), s = calculateRandomNumber(4e3, 8e3), l = calculateRandomNumber(1e4, 12e3); await delay(t), chrome.runtime.sendMessage({ message: "mimic_human_scrolling", maxDuration: l }), await delay(l), await delay(m), chrome.runtime.sendMessage({ message: "open_search_panel", tabId: e }), await delay(n), chrome.runtime.sendMessage({ message: "type_text", text: a }), await delay(s) } homePageFlow();
async function watchPosts(maxDuration) {
    const minWatchDuration = 7500;
    const maxWatchDuration = 25000;

    const script = `
        const post = document.querySelectorAll('div._aagw')[0];
        if (post) {
            post.click();

            let watching = true;
            const startTime = Date.now();

            function watchPost() {
                if (!watching) return;

                const elapsedTime = Date.now() - startTime;
                if (elapsedTime >= ${maxDuration}) {
                    watching = false;
                    return;
                }

                const watchDuration = Math.floor(Math.random() * (${maxWatchDuration} - ${minWatchDuration} + 1) + ${minWatchDuration});

                setTimeout(() => {
                    const nextSvg = document.querySelector('svg[aria-label="Next"]');

                    if (nextSvg) {
                        nextSvg.parentElement.parentElement.parentElement.click();
                        watchPost();
                    }
                }, watchDuration);
            }

            watchPost();
        }
    `;
    const tabId = await getCurrentCampaignTabId();

    chrome.debugger.sendCommand(
        { tabId: tabId },
        "Runtime.evaluate",
        { expression: script },
        (result) => {
            if (chrome.runtime.lastError) {
                console.error("Failed to evaluate script:", chrome.runtime.lastError.message);
            }
        }
    );
}

self.watchPosts = watchPosts;
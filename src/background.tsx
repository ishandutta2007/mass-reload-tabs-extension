import "libs/polyfills";
import browser from "webextension-polyfill";

async function reloadStrategy(tab, strategy, options = {}) {
    console.log('background:reloadStrategy:', tab);
    let issueReload = true

    if (options.reloadPinnedOnly && !tab.pinned) {
        issueReload = false
    }

    if (options.reloadUnpinnedOnly && tab.pinned) {
        issueReload = false
    }

    if (options.reloadAllLeft) {
        if (tab.active) {
            strategy.stop = true
        }

        if (strategy.stop) {
            issueReload = false
        }
    }

    if (options.reloadAllRight) {
        if (!strategy.reset) {
            if (!tab.active) {
                strategy.stop = true
            } else {
                strategy.reset = true
            }
        }

        if (strategy.stop) {
            issueReload = false
            if (strategy.reset) {
                strategy.stop = false
            }
        }
    }

    // if (issueReload) {
    //     const {
    //         bypassCache
    //     } = await getSetting(['bypassCache'])
    //     console.log(`reloading ${tab.url}, cache bypassed: ${bypassCache}`)
    //     browser.tabs.reload(tab.id, {
    //         bypassCache
    //     }, null)
    // }
}

browser.runtime.onMessage.addListener(async (msg, sender) => {
  if (msg.greeting === "showOptionsPage") {
    browser.runtime.openOptionsPage();
    return true;
  }
  else if (msg.greeting === "getTabInfo") {
    browser.tabs.query({}).then(async (tabs) => {
      console.log('background:getTabInfo:tabs:', tabs);
      const response = { greeting: 'sendTabInfo', payload: { tabs } };
      if (sender.url) {
        console.log('background:getTabInfo:sender.url:', sender.url);
        let url_splits = sender.url.split("/");
        if (url_splits[url_splits.length - 1] == 'popup.html'){
          const options = {}
          const strategy = {}
          tabs.forEach((tab) => {
            setTimeout(function(){ browser.tabs.reload(tab.id); }, 1000 * tab.index);
          });
          return true;
        }
      }
    }).catch((error) => {
      console.error('background:getTabInfo:Error:', error);
    });
    return true;
  }
});


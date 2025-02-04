(function () {
  "use strict";

  let originalContent = new Map(); // Store original text

  function replaceText(node, wordToReplace, replacementWord) {
    if (node.nodeType === 3) { // Text node
      if (!originalContent.has(node)) {
        originalContent.set(node, node.nodeValue); // Save original text
      }
      node.nodeValue = node.nodeValue.replace(new RegExp(`\\b${wordToReplace}\\b`, "gi"), replacementWord);
    } else {
      node.childNodes.forEach(child => replaceText(child, wordToReplace, replacementWord));
    }
  }

  function restoreOriginalText() {
    originalContent.forEach((originalValue, node) => {
      node.nodeValue = originalValue;
    });
    originalContent.clear(); // Clear saved data
  }

  function updatePageContent(wordToReplace, replacementWord) {
    if (!document.body) {
      setTimeout(() => updatePageContent(wordToReplace, replacementWord), 50);
      return;
    }

    replaceText(document.body, wordToReplace, replacementWord);
  }

  function startObserver(wordToReplace, replacementWord) {
    updatePageContent(wordToReplace, replacementWord);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(node => replaceText(node, wordToReplace, replacementWord));
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Load stored values initially
  chrome.storage.sync.get(["wordToReplace", "replacementWord"], (data) => {
    if (data.wordToReplace && data.replacementWord) {
      startObserver(data.wordToReplace, data.replacementWord);
    }
  });

  // Listen for messages from popup.js
  chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "updateWords") {
      updatePageContent(message.wordToReplace, message.replacementWord);
    } else if (message.type === "restoreOriginal") {
      restoreOriginalText(); // Restore page to original state
    }
  });
})();

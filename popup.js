document.addEventListener("DOMContentLoaded", () => {
  const wordToReplaceInput = document.getElementById("wordToReplace");
  const replacementWordInput = document.getElementById("replacementWord");
  const saveButton = document.getElementById("save");
  const undoButton = document.getElementById("undo");

  // Load existing values
  chrome.storage.sync.get(["wordToReplace", "replacementWord"], (data) => {
    if (data.wordToReplace) wordToReplaceInput.value = data.wordToReplace;
    if (data.replacementWord) replacementWordInput.value = data.replacementWord;
  });

  // Save new values and notify content script
  saveButton.addEventListener("click", () => {
    const wordToReplace = wordToReplaceInput.value.trim();
    const replacementWord = replacementWordInput.value.trim();

    chrome.storage.sync.set({ wordToReplace, replacementWord }, () => {
      alert("Changes saved!");

      // Send a message to the content script to update words
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "updateWords", wordToReplace, replacementWord });
      });
    });
  });

  // Undo button: reset stored values and notify content script
  undoButton.addEventListener("click", () => {
    wordToReplaceInput.value = "";
    replacementWordInput.value = "";

    chrome.storage.sync.remove(["wordToReplace", "replacementWord"], () => {
      alert("Original content restored!");

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "restoreOriginal" });
      });
    });
  });
});

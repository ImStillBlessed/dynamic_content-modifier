# Dynamic Webpage Content Modifier - Chrome Extension

## 📌 Overview

This Chrome extension allows users to dynamically modify webpage content by replacing specific words with custom alternatives. The changes are applied instantly, and an "Undo" feature is available to restore the page to its original state.

## ✨ Features

- Modify webpage content dynamically before it is displayed.
- Uses `MutationObserver` to update content in real time.
- Stores original content and allows restoring it with an "Undo" button.
- Provides a user-friendly popup interface to customize word replacements.
- Works seamlessly across multiple webpages.

## 📂 Project Structure

```
📁 dynamic-content-modifier/
├── 📄 manifest.json           # Chrome extension manifest file
├── 📄 popup.html              # HTML for the popup UI
├── 📄 popup.js                # JavaScript logic for the popup UI
├── 📄 modify.js               # Content script for modifying webpage content
├── 📄 styles.css              # Stylesheet for popup UI
└── 📄 README.md               # Project documentation
```

## 🔧 Installation

1. **Download or Clone** the repository.

   ```sh
   git clone https://github.com/your-repo/dynamic-content-modifier.git
   ```

2. **Open Chrome** and go to:

   ```
   chrome://extensions/
   ```

3. **Enable Developer Mode** (toggle switch in the top-right corner).

4. Click **Load Unpacked** and select the project folder.

5. The extension should now appear in your browser!

## 📖 Usage Guide

### Step 1: Open the Extension Popup

Click the extension icon in the Chrome toolbar to open the popup interface.

### Step 2: Set Word Replacements

- Enter the **word to replace** (e.g., `Apple`).
- Enter the **replacement word** (e.g., `Banana`).
- Click **Save changes** to apply changes.

### Step 3: Observe the Changes

- The selected word is instantly replaced across the webpage.
- The changes persist until manually updated or undone.

### Step 4: Undo Changes

- Click the **Undo** button in the popup.
- This restores the webpage to its original form using saved content.

## 🛠️ Technical Details

### **Content Script (`modify.js`)**

- Observes mutations on the page using `MutationObserver`.
- Replaces words dynamically while preserving original text.
- Listens for messages from `popup.js` to update or restore content.

### **Popup Script (`popup.js`)**

- Stores user input using `chrome.storage.sync`.
- Sends messages to `modify.js` to apply changes dynamically.
- Handles the Undo functionality to reset content.

## 🏆 Future Enhancements

- Add an option to exclude certain elements from modification.
- Implement support for multiple word pairs.
- Provide an export/import feature for word replacement lists.

## 🤝 Contributing

If you’d like to contribute:

1. Fork the repository
2. Create a new branch (`feature-name`)
3. Commit your changes (`git commit -m 'Added new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a Pull Request

## ⚖️ License

This project is licensed under the MIT License. Feel free to modify and distribute it as needed!

## 📞 Support

For any issues or feature requests, open an issue on [GitHub](https://github.com/your-repo/dynamic-content-modifier/issues).

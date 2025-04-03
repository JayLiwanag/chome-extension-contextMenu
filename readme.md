# RCA Generator Chrome Extension

A Chrome extension that helps generate Root Cause Analysis (RCA) based on selected text. The extension processes the selected text through multiple classification stages to determine appropriate root cause categories.

## Features

- Context menu integration for easy access
- Automatic text classification system
- Multi-stage root cause analysis
- Popup display of results
- Blue-themed modern interface

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

## Usage

1. Select text on any webpage
2. Right-click and choose "RCA Generator" from the context menu
3. A popup will appear showing:
   - Selected text (Defect description)
   - Review Classification
   - Cause creation category
   - Root cause analysis

## File Structure

```
chrome-sample-extension-contextMenu/
├── manifest.json       # Extension configuration
├── background.js      # Background service worker
├── script.js          # Content script
├── popup.html         # Popup interface
├── popup.css         # Popup styling
├── popup.js          # Popup functionality
├── Prompt/           # JSON data files
│   ├── prompt1.json  # Review classifications
│   ├── prompt2.json  # Cause categories
│   └── prompt3.json  # Root causes
└── Rules/            # Rule definitions
    └── *.json        # Various rule files
```

## Technical Details

- Uses Chrome Extension Manifest V3
- Implements message passing between content scripts and background service worker
- Utilizes chrome.storage for data persistence
- Employs async/await for JSON data handling
- Features a modular architecture for rule processing

## Permissions Required

- contextMenus: For right-click menu integration
- storage: For data persistence
- clipboardWrite: For copy functionality
- windows: For popup window management

## Development

To modify the extension:

1. Edit JSON files in the Prompt directory to modify classifications
2. Adjust rules in the Rules directory to change logic
3. Modify popup.css to customize the interface
4. Update script.js to change processing logic

## Notes

- The popup window appears in the top-right corner of the screen
- All text areas are read-only to prevent modification
- Rule processing is done asynchronously to prevent UI blocking
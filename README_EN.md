# SVG to PNG Chrome Extension

A simple and practical Chrome extension that quickly converts SVG code to PNG image format.

## Features

- Supports direct SVG code paste conversion
- Real-time SVG preview
- Custom output filename
- One-click download PNG image
- Clean and intuitive user interface

## Installation

1. Download the extension source code
2. Open Chrome browser and go to extensions page (chrome://extensions/)
3. Enable "Developer mode" in top right corner
4. Click "Load unpacked" button
5. Select the extension folder

## Usage

1. Click the extension icon in Chrome toolbar to open the converter
2. Paste SVG code in the text box
3. Preview SVG in real-time
4. Optional: Set custom filename in the input box
5. Click "Download PNG" button to automatically download the converted PNG image

## Notes

- Ensure the input SVG code is correctly formatted
- If no filename is specified, default name "image.png" will be used
- Converted PNG will be saved to browser's default download directory

## Technical Implementation

- Uses native JavaScript for SVG to PNG conversion
- Utilizes Canvas API for image processing
- Developed using Chrome Extension Manifest V3 specification
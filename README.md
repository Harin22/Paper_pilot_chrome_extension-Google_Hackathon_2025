# Paper Pilot - AI Research Assistant

A Chrome extension that uses built-in AI APIs to summarize, rewrite, and translate research papers for students. Works with PDF files directly in the browser.

## Features

-  **PDF Text Extraction**: Automatically extracts text from PDF files
-  **AI Summarization**: Uses Chrome's built-in AI to create concise summaries
-  **Text Simplification**: Rewrites complex academic text in simpler terms
-  **Smart PDF Detection**: Works with various PDF viewers and embedded PDFs
-  **Professional Interface**: Clean, business-like design


### Install from Chrome Web Store (Coming Soon)

*This extension will be available on the Chrome Web Store soon.*

## Usage

1. **Open a PDF file** in your browser (any PDF viewer)
2. **Click the Paper Pilot icon** in the Chrome toolbar
3. **Click "Load PDF"** to extract text from the document
4. **Use AI features**:
   - **Summarize**: Get a concise summary of the paper
   - **Simplify**: Rewrite complex text in simpler terms


## Technical Details

### Dependencies
- **PDF.js**: For PDF text extraction
- **Chrome Extensions API**: For tab management and side panel
- **Chrome AI API**: For built-in AI features (when available)

### Permissions
- `activeTab`: Access current tab information
- `scripting`: Execute scripts in tabs
- `sidePanel`: Display side panel interface
- `tabs`: Read tab URLs
- `<all_urls>`: Access PDF files from any website

### Browser Compatibility
- Chrome 88+ (for side panel support)
- Edge 88+ (for side panel support)
- Requires "Allow access to file URLs" for local PDF files

## Development

### Prerequisites
- Chrome or Edge browser
- Basic knowledge of JavaScript and Chrome Extensions

### Building from Source
1. Clone the repository
2. No build process required - it's a pure JavaScript extension
3. Load as unpacked extension in Chrome

### Key Files
- `sidepanel.js`: Main logic for PDF processing and AI integration
- `manifest.json`: Extension configuration and permissions
- `sidepanel.html`: User interface

## AI Features

The extension supports multiple AI backends:

1. **Chrome Built-in AI** (preferred)
   - Uses `chrome.ai.summarizer` and `chrome.ai.rewriter`
   - Requires enabling experimental AI features

2. **Window AI API** (fallback)
   - Uses `window.ai` namespace
   - Alternative AI implementation

3. **Fallback Processing** (always available)
   - Simple text summarization
   - Basic text simplification
   - Works without AI APIs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- Create an issue on GitHub for bugs
- Check the troubleshooting section first
- Ensure you're using a supported browser version

## Changelog

### v0.1
- Initial release
- PDF text extraction
- AI summarization and simplification
- Side panel interface
- basic design

---

**Made with ❤️ for students and researchers**



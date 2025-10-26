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

## How it works

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

## Development

### Key Files
- `sidepanel.js`: Main logic for PDF processing and AI integration
- `manifest.json`: Extension configuration and permissions
- `sidepanel.html`: User interface

## AI API that we used in this project (according to the hackathon):

1. **Chrome Built-in AI** (preferred)
   - Uses `chrome.ai.summarizer` and `chrome.ai.rewriter`
   - Requires enabling experimental AI features

2. **Window AI API** (backup)
   - Uses `window.ai` namespace
   - Alternative AI implementation

## if you wanna Contribute? then..

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

---

**Made with ❤️ for students and researchers**

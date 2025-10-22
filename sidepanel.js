document.addEventListener('DOMContentLoaded', () => {

  pdfjsLib.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL('lib/pdf.worker.min.js');

  let pdfText = '';

  const loadBtn = document.getElementById('loadBtn');
  const status = document.getElementById('status');
  const output = document.getElementById('output');
  const controls = document.getElementById('controls');

  function extractPdfUrlFromChromeViewer(viewerUrl) {
    try {
      const url = new URL(viewerUrl);
      const srcParam = url.searchParams.get('src') || url.searchParams.get('file');
      if (srcParam) return decodeURIComponent(srcParam);
    } catch {}
    return null;
  }

  function isLoadableScheme(urlString) {
    try {
      const url = new URL(urlString);
      return ['http:', 'https:', 'blob:', 'data:', 'file:'].includes(url.protocol);
    } catch {
      return false;
    }
  }

  loadBtn.addEventListener('click', async () => {
    try {
      status.textContent = 'Loading...';
      
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      let pdfUrl = tab?.url || '';
      
      let pageFoundUrl = null;
      try {
        const [{ result }] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            try {
              const embed = document.querySelector('embed[type="application/pdf"]');
              if (embed?.src) return embed.src;
              const iframes = Array.from(document.querySelectorAll('iframe'));
              for (const iframe of iframes) {
                if (!iframe.src) continue;
                try {
                  const u = new URL(iframe.src);
                  const srcParam = u.searchParams.get('src') || u.searchParams.get('file');
                  if (srcParam) return decodeURIComponent(srcParam);
                } catch {}
              }
              const linkPdf = Array.from(document.querySelectorAll('a[href]'))
                .map(a => a.href)
                .find(href => /\.pdf(\?|#|$)/i.test(href));
              if (linkPdf) return linkPdf;
              return window.location.href;
            } catch {
              return null;
            }
          }
        });
        pageFoundUrl = result;
      } catch {}

      const candidates = [];
      if (pageFoundUrl) candidates.push(pageFoundUrl);
      const extractedFromTab = extractPdfUrlFromChromeViewer(pdfUrl);
      if (extractedFromTab) candidates.push(extractedFromTab);
      candidates.push(pdfUrl);

      for (const candidate of candidates) {
        if (!candidate) continue;
        if (candidate === 'about:blank') continue;
        if (!isLoadableScheme(candidate)) continue;
        pdfUrl = candidate;
        break;
      }
      
      if (!pdfUrl) {
        throw new Error('Could not resolve a PDF URL from this page.');
      }
      
      status.textContent = 'Reading your PDF...';
      
      if (typeof pdfjsLib === 'undefined') {
        throw new Error('PDF library not loaded yet. Please wait a moment and try again.');
      }

      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      let text = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
        status.textContent = `Page ${i}/${pdf.numPages}`;
      }
      
      pdfText = text;
      status.textContent = 'PDF loaded successfully!';
      output.textContent = `Extracted ${text.length} characters.\n\n${text.substring(0, 500)}...`;
      controls.classList.remove('hidden');
      
    } catch (error) {
      status.textContent = 'Error: ' + error.message;
      console.error(error);
    }
  });

  controls.addEventListener('click', async (e) => {
    if (!e.target.matches('button')) return;
    
    const action = e.target.dataset.action;
    if (!pdfText) return;
    
    try {
      status.textContent = 'AI processing...';
      
      if (action === 'summarize') {
        if (chrome.ai?.summarizer) {
          const summarizer = await chrome.ai.summarizer.create();
          const result = await summarizer.summarize(pdfText.substring(0, 10000));
          output.textContent = 'Summary:\n\n' + result;
          summarizer.destroy();
        } else if (window.ai?.summarizer) {
          const summarizer = await window.ai.summarizer.create();
          const result = await summarizer.summarize(pdfText.substring(0, 10000));
          output.textContent = 'Summary:\n\n' + result;
          summarizer.destroy();
        } else {

          const words = pdfText.split(' ');
          const sentences = pdfText.split(/[.!?]+/).filter(s => s.trim().length > 10);
          const keySentences = sentences.slice(0, Math.min(10, sentences.length));
          const summary = keySentences.join('. ') + '.';
          output.textContent = 'Summary (key sentences):\n\n' + summary;
        }
      }
      
      if (action === 'simplify') {
        if (chrome.ai?.rewriter) {
          const rewriter = await chrome.ai.rewriter.create();
          const result = await rewriter.rewrite(pdfText.substring(0, 10000), { 
            tone: 'more-casual' 
          });
          output.textContent = 'Simplified:\n\n' + result;
          rewriter.destroy();
        } else if (window.ai?.rewriter) {
          const rewriter = await window.ai.rewriter.create();
          const result = await rewriter.rewrite(pdfText.substring(0, 10000), { 
            tone: 'more-casual' 
          });
          output.textContent = 'Simplified:\n\n' + result;
          rewriter.destroy();
        } else {

          const sentences = pdfText.split(/[.!?]+/).filter(s => s.trim().length > 5);
          const simplified = sentences.map(sentence => {

            return sentence
              .replace(/\b(consequently|furthermore|moreover|however|therefore)\b/gi, '')
              .replace(/\b(utilize|facilitate|implement|optimize)\b/gi, 'use')
              .replace(/\b(significant|substantial|considerable)\b/gi, 'important')
              .replace(/\b(approximately|circa)\b/gi, 'about')
              .trim();
          }).filter(s => s.length > 10).slice(0, 20).join('. ') + '.';
          
          output.textContent = 'Simplified (processed text):\n\n' + simplified;
        }
      }
      
      status.textContent = 'Done!';
      
    } catch (error) {
      status.textContent = 'Error: ' + error.message;
      console.error(error);
    }
  });

  console.log('Paper Pilot side panel script initialized!');

}); 

import { Theme } from '../types';

/**
 * Utility to convert style objects to inline style strings
 */
const styleToString = (style: Record<string, string>) => {
  return Object.entries(style)
    .map(([k, v]) => {
      const key = k.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
      return `${key}: ${v}`;
    })
    .join('; ');
};

/**
 * A simplified Markdown parser that outputs WeChat-safe inline styles.
 */
export const renderToWeChatHTML = (markdown: string, theme: Theme, backgroundCss: Record<string, string> = {}): string => {
  const { styles } = theme;
  let html = markdown;

  // 1. Basic preprocessing
  html = html.replace(/\r\n/g, '\n');

  // 2. Code & Pre (Process first to avoid conflicts)
  html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
    return `<pre style="${styleToString(styles.pre)}"><code style="font-family: Menlo, Monaco, Consolas, Courier New, monospace; display: block; white-space: pre-wrap;">${code.trim()}</code></pre>`;
  });
  html = html.replace(/`(.*?)`/g, `<code style="${styleToString(styles.code)}">$1</code>`);

  // 3. Headings
  html = html.replace(/^### (.*$)/gm, `<h3 style="${styleToString(styles.h3)}">$1</h3>`);
  html = html.replace(/^## (.*$)/gm, `<h2 style="${styleToString(styles.h2)}">$1</h2>`);
  html = html.replace(/^# (.*$)/gm, `<h1 style="${styleToString(styles.h1)}">$1</h1>`);

  // 4. Blockquotes
  html = html.replace(/^> (.*$)/gm, `<blockquote style="${styleToString(styles.blockquote)}">$1</blockquote>`);

  // 5. Strong & Emphasis
  html = html.replace(/\*\*(.*?)\*\*/g, `<strong style="${styleToString(styles.strong)}">$1</strong>`);
  html = html.replace(/\*(.*?)\*/g, `<em style="font-style:italic">$1</em>`);

  // 6. Horizontal Rules
  html = html.replace(/^---$/gm, `<hr style="${styleToString(styles.hr)}" />`);

  // 7. Images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, `<img src="$2" alt="$1" style="${styleToString(styles.image)}" />`);

  // 8. Lists
  html = html.replace(/^[\*\-] (.*$)/gm, `<li style="${styleToString(styles.li)}">$1</li>`);
  // Group adjacent <li> tags into <ul>
  html = html.replace(/(<li style=".*?">.*?<\/li>\n?)+/g, (match) => {
    return `<ul style="${styleToString(styles.ul)}">${match}</ul>`;
  });

  // 9. Paragraphs and cleanup
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed === '') return ''; 
    const isBlock = trimmed.startsWith('<h') || 
                    trimmed.startsWith('<blockquote') || 
                    trimmed.startsWith('<ul') || 
                    trimmed.startsWith('<li') || 
                    trimmed.startsWith('<pre') || 
                    trimmed.startsWith('<hr') || 
                    trimmed.startsWith('<img');
    
    if (isBlock) return trimmed;
    return `<p style="${styleToString(styles.p)}">${trimmed}</p>`;
  });
  
  html = processedLines.filter(l => l !== '').join('');

  // 10. Prepare final container style
  // Merge theme container styles with background CSS overrides
  const containerStyle = { 
    ...styles.container,
    ...backgroundCss 
  };

  return `<section style="${styleToString(containerStyle)}">${html}</section>`;
};

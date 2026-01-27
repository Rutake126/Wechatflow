
import { Theme } from '../types';

const WECHAT_FONT_STACK = "'PingFang SC', -apple-system-font, BlinkMacSystemFont, 'Helvetica Neue', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif";

export const THEMES: Theme[] = [
  {
    id: 'pure-elegant',
    name: '纯净雅致',
    description: '【最稳定】复刻经典纯色方案，100% 不掉排版',
    colors: { primary: '#c86442', bg: '#faf9f5', text: '#222222' },
    styles: {
      container: { 
        padding: '30px 20px', 
        backgroundColor: '#faf9f5', 
        color: '#222222', 
        lineHeight: '1.75',
        maxWidth: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        fontFamily: WECHAT_FONT_STACK,
        borderRadius: '12px',
        display: 'block',
        minHeight: '500px'
      },
      h1: { margin: '1.5em 0 0.75em 0', padding: '0.8em 1em', backgroundColor: '#c86442', fontSize: '20px', fontWeight: 'bold', lineHeight: '1.4', color: '#ffffff', textAlign: 'center', borderRadius: '8px' },
      h2: { margin: '2em 0 0.75em 0', padding: '0 0 0.5em 12px', borderLeft: '4px solid #c86442', borderBottom: '1px dashed #c86442', fontSize: '18px', fontWeight: 'bold', color: '#3f3f3f' },
      h3: { fontSize: '17px', fontWeight: 'bold', margin: '1.5em 0 0.5em 0', color: '#c86442' },
      p: { marginBottom: '1.2em', fontSize: '15px', color: '#222222', textAlign: 'justify', letterSpacing: '0.05em', lineHeight: '1.8' },
      blockquote: { borderLeft: '3px solid #c86442', padding: '15px 20px', margin: '20px 0', background: '#fcf2ee', color: '#666666', fontSize: '14px', borderRadius: '4px' },
      code: { background: '#f3f4f6', padding: '2px 4px', borderRadius: '3px', fontSize: '13px', color: '#c86442' },
      pre: { background: '#2d2d2d', color: '#cccccc', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '13px', overflowX: 'auto' },
      ul: { paddingLeft: '20px', marginBottom: '1.2em', listStyleType: 'disc' },
      ol: { paddingLeft: '20px', marginBottom: '1.2em' },
      li: { marginBottom: '6px', fontSize: '15px', color: '#333333' },
      strong: { color: '#c86442', fontWeight: 'bold' },
      hr: { border: 'none', height: '1px', margin: '2em 0', background: 'linear-gradient(to right, rgba(200, 100, 66, 0), rgba(200, 100, 66, 0.6), rgba(200, 100, 66, 0))' },
      image: { maxWidth: '100%', borderRadius: '8px', margin: '15px 0', display: 'block' },
    }
  },
  {
    id: 'retro-story',
    name: '人文故事',
    description: '衬线字体与暖色纸张，适合深度阅读',
    colors: { primary: '#78350f', bg: '#fdfaf6', text: '#451a03' },
    styles: {
      container: { padding: '40px 25px', backgroundColor: '#fdfaf6', color: '#451a03', lineHeight: '2', fontFamily: "'Noto Serif SC', serif", borderRadius: '12px', minHeight: '500px' },
      h1: { fontSize: '24px', textAlign: 'center', fontWeight: '700', marginBottom: '40px', border: '3px double #78350f', padding: '15px' },
      h2: { fontSize: '19px', fontWeight: '700', textAlign: 'center', margin: '2em 0 1.5em 0', borderBottom: '1px solid #78350f', paddingBottom: '5px' },
      h3: { fontSize: '17px', fontWeight: '700', fontStyle: 'italic', marginTop: '1.5em' },
      p: { marginBottom: '1.8em', fontSize: '16px', textIndent: '2em' },
      blockquote: { border: '1px solid #d97706', padding: '20px', margin: '30px 10px', fontStyle: 'italic', background: '#fffbeb' },
      code: { background: '#fef3c7', color: '#92400e', padding: '2px 4px' },
      pre: { background: '#451a03', color: '#fef3c7', padding: '20px', borderRadius: '4px' },
      ul: { paddingLeft: '25px' },
      ol: { paddingLeft: '25px' },
      li: { marginBottom: '12px' },
      strong: { color: '#92400e', borderBottom: '1px solid #92400e' },
      hr: { border: 'none', borderTop: '1px solid #d97706', margin: '50px 0' },
      image: { maxWidth: '100%', filter: 'sepia(20%)' },
    }
  }
];

export interface BackgroundOption {
  id: string;
  name: string;
  css: Record<string, string>;
}

export const BACKGROUNDS: BackgroundOption[] = [
  { 
    id: 'none', 
    name: '无背景', 
    css: {} 
  },
  { 
    id: 'grid-yellow', 
    name: '淡黄方格', 
    css: {
      backgroundColor: '#fdf8e8',
      backgroundImage: `linear-gradient(rgba(180, 160, 100, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(180, 160, 100, 0.25) 1px, transparent 1px)`,
      backgroundSize: '30px 30px',
      backgroundRepeat: 'repeat',
      boxShadow: 'inset 0 0 20px rgba(180, 140, 80, 0.1)'
    }
  },
  { 
    id: 'grid-white', 
    name: '白底方格', 
    css: {
      backgroundColor: '#ffffff',
      backgroundImage: `linear-gradient(rgba(200, 200, 200, 0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 200, 200, 0.35) 1px, transparent 1px)`,
      backgroundSize: '28px 28px',
      backgroundRepeat: 'repeat',
      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.03)'
    }
  }
];

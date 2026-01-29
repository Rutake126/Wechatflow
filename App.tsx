
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Copy, 
  Trash2, 
  Smartphone, 
  Monitor,
  CheckCircle2,
  ChevronDown,
  Palette,
  Grid3X3
} from 'lucide-react';
import { THEMES, BACKGROUNDS } from './themes/definitions';
import { renderToWeChatHTML } from './lib/markdown-engine';

const INITIAL_CONTENT = `# 欢迎使用 WeChatFlow

**沉浸创作，美由心生。** 我们致力于为您提供一个简洁、高效、美观的公众号文章排版工具。

## ✨ 主要功能
* **实时预览**：左侧编辑，右侧即时查看排版效果。
* **一键复制**：轻松复制富文本格式。
* **精美样式**：内置精心调校的微信主题。

## 须知
您只管专注于文字，排版的美感，我们来呈现。
`;

const App: React.FC = () => {
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [currentTheme, setCurrentTheme] = useState(THEMES[0]);
  const [currentBg, setCurrentBg] = useState(BACKGROUNDS[0]);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showBgMenu, setShowBgMenu] = useState(false);

  const themeMenuRef = useRef<HTMLDivElement>(null);
  const bgMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
      if (bgMenuRef.current && !bgMenuRef.current.contains(event.target as Node)) {
        setShowBgMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderedHTML = useMemo(() => {
    return renderToWeChatHTML(content, currentTheme, currentBg.css);
  }, [content, currentTheme, currentBg]);

  const handleCopy = async () => {
    try {
      const html = renderedHTML;
      const blob = new Blob([html], { type: 'text/html' });
      const data = [new ClipboardItem({ 'text/html': blob })];
      await navigator.clipboard.write(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = renderedHTML;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    if (confirm("确定要清空编辑器内容吗？")) {
      setContent("");
    }
  };

  return (
    <div className="h-screen flex flex-col p-2 md:p-8 gap-4 md:gap-6 max-w-[1600px] mx-auto overflow-hidden">
      {/* Header */}
      <header className="h-14 md:h-16 flex items-center justify-between px-2 md:px-6 sticky top-0 z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
            <img src="/wechatflowlogo.png" alt="WeChatFlow Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-base md:text-lg font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hidden sm:block">WeChatFlow</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Mobile Tab Switcher */}
          <div className="flex md:hidden bg-zinc-100 p-1 rounded-xl mr-2">
            <button 
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'edit' ? 'bg-white shadow-sm text-emerald-600' : 'text-zinc-500'}`}
            >
              编辑
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'preview' ? 'bg-white shadow-sm text-emerald-600' : 'text-zinc-500'}`}
            >
              预览
            </button>
          </div>

          {/* Theme Selector */}
          <div className="relative" ref={themeMenuRef}>
            <button 
              onClick={() => { setShowThemeMenu(!showThemeMenu); setShowBgMenu(false); }}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-white rounded-full shadow-sm text-xs md:text-sm font-medium hover:bg-zinc-50 transition-colors border border-zinc-100"
            >
              <Palette size={14} className="md:w-4 md:h-4" style={{ color: currentTheme.colors.primary }} />
              <span className="hidden xs:inline">风格:</span>
              <span className="max-w-[60px] md:max-w-none truncate">{currentTheme.name}</span>
              <ChevronDown size={12} className={`md:w-3.5 md:h-3.5 transition-transform duration-300 ${showThemeMenu ? 'rotate-180' : ''}`} />
            </button>

            {showThemeMenu && (
              <div className="absolute top-12 right-0 w-48 md:w-64 bg-white rounded-2xl shadow-2xl border border-zinc-100 z-[101] p-2 overflow-hidden shadow-zinc-300/50">
                {THEMES.map((theme) => {
                  const isSelected = currentTheme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setCurrentTheme(theme);
                        setShowThemeMenu(false);
                      }}
                      style={{ 
                        backgroundColor: isSelected ? theme.colors.bg : 'transparent',
                        color: isSelected ? theme.colors.primary : '#52525b',
                        borderColor: isSelected ? theme.colors.primary : 'transparent'
                      }}
                      className={`w-full flex flex-col items-start p-2 md:p-3 rounded-xl transition-all border text-xs md:text-sm ${
                        isSelected ? 'border-opacity-30' : 'hover:bg-zinc-50 border-transparent'
                      }`}
                    >
                      <span className="font-bold">{theme.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Background Selector */}
          <div className="relative" ref={bgMenuRef}>
            <button 
              onClick={() => { setShowBgMenu(!showBgMenu); setShowThemeMenu(false); }}
              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-2 bg-white rounded-full shadow-sm text-xs md:text-sm font-medium hover:bg-zinc-50 transition-colors border border-zinc-100"
            >
              <Grid3X3 size={14} className="md:w-4 md:h-4" style={{ color: currentTheme.colors.primary }} />
              <span className="hidden xs:inline">背景:</span>
              <span className="max-w-[60px] md:max-w-none truncate">{currentBg.name}</span>
              <ChevronDown size={12} className={`md:w-3.5 md:h-3.5 transition-transform duration-300 ${showBgMenu ? 'rotate-180' : ''}`} />
            </button>

            {showBgMenu && (
              <div className="absolute top-12 right-0 w-48 bg-white rounded-2xl shadow-2xl border border-zinc-100 z-[101] p-2 shadow-zinc-300/50">
                {BACKGROUNDS.map((bg) => {
                  const isSelected = currentBg.id === bg.id;
                  return (
                    <button
                      key={bg.id}
                      onClick={() => {
                        setCurrentBg(bg);
                        setShowBgMenu(false);
                      }}
                      style={{ 
                        backgroundColor: isSelected ? currentTheme.colors.bg : 'transparent',
                        color: isSelected ? currentTheme.colors.primary : '#52525b',
                        borderColor: isSelected ? currentTheme.colors.primary : 'transparent'
                      }}
                      className={`w-full flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-xl transition-all border text-xs md:text-sm ${
                        isSelected ? 'border-opacity-30' : 'hover:bg-zinc-50 border-transparent'
                      }`}
                    >
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded border border-zinc-200 flex-shrink-0" 
                        style={{ 
                          backgroundImage: 'none', 
                          backgroundColor: '#f4f4f5' 
                        }}
                      />
                      <span className="font-medium truncate">{bg.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-6 overflow-hidden">
        {/* Editor */}
        <div className={`flex-1 flex-col bg-white rounded-3xl md:rounded-[2rem] shadow-xl shadow-zinc-200/50 relative overflow-hidden group border border-zinc-100/50 ${activeTab === 'edit' ? 'flex' : 'hidden md:flex'}`}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            className="flex-1 p-6 md:p-10 text-base md:text-lg leading-relaxed bg-transparent resize-none editor-textarea custom-scrollbar text-zinc-700 font-mono"
            placeholder="在此输入你的 Markdown 内容..."
          />
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-3 translate-y-2 md:translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
             <button onClick={handleClear} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white border border-zinc-100 text-zinc-400 rounded-xl md:rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all shadow-xl">
               <Trash2 size={18} />
             </button>
          </div>
        </div>

        {/* Preview */}
        <div className={`flex-1 flex-col bg-white rounded-3xl md:rounded-[2rem] shadow-xl shadow-zinc-200/50 overflow-hidden relative border border-zinc-100/50 ${activeTab === 'preview' ? 'flex' : 'hidden md:flex'}`}>
          <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-6 h-16 md:h-20 border-b border-zinc-50">
            <div className="bg-zinc-100 p-1 rounded-xl md:rounded-2xl flex gap-1">
              <button onClick={() => setViewMode('mobile')} className={`flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold rounded-lg md:rounded-xl transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}`}><Smartphone size={14} className="md:w-4 md:h-4" /><span>手机</span></button>
              <button onClick={() => setViewMode('desktop')} className={`flex items-center gap-2 px-3 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-semibold rounded-lg md:rounded-xl transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}`}><Monitor size={14} className="md:w-4 md:h-4" /><span>桌面</span></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#f8f8f7] flex justify-center p-4 md:p-8">
            <div className={`transition-all duration-500 h-fit ${viewMode === 'mobile' ? 'w-full max-w-[375px]' : 'w-full max-w-[800px]'}`}>
              <div 
                className="shadow-2xl rounded-2xl overflow-hidden bg-white min-h-[400px] md:min-h-[500px]"
                dangerouslySetInnerHTML={{ __html: renderedHTML }}
              />
            </div>
          </div>

          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 md:px-8 py-3.5 md:py-5 rounded-full text-sm md:text-base font-bold transition-all shadow-2xl active:scale-95 z-50 ${copied ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-white hover:bg-black'}`}
            >
              {copied ? <><CheckCircle2 size={18} className="md:w-5 md:h-5" /><span>复制成功</span></> : <><Copy size={18} className="md:w-5 md:h-5" /><span>复制到公众号</span></>}
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center py-1 md:py-2">
         <span className="text-[8px] md:text-[10px] text-zinc-400 font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase text-center">Built for Premium Content Creators</span>
      </div>
    </div>
  );
};

export default App;

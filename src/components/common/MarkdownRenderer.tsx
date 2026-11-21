import React, { useState } from 'react';
import { Copy, Check, Play, BookOpen, Sparkles, Terminal } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  onRunCode?: (code: string, language: string) => void;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onRunCode }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Parse markdown into structured blocks
  const parseMarkdown = (raw: string) => {
    const lines = raw.split('\n');
    const blocks: React.ReactNode[] = [];
    let i = 0;
    let blockKey = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Code blocks
      if (line.trim().startsWith('```')) {
        const langMatch = line.trim().match(/```(\w+)?/);
        const language = langMatch && langMatch[1] ? langMatch[1] : 'plaintext';
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        const codeText = codeLines.join('\n');
        const codeIndex = blockKey;

        blocks.push(
          <div key={`code-${blockKey++}`} className="my-6 rounded-2xl overflow-hidden border border-slate-700 bg-[#0B0F19] shadow-lg">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="flex gap-1.5 mr-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                </span>
                <span className="font-mono uppercase font-semibold text-purple-400 text-[11px] tracking-wider px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                  {language}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {onRunCode && ['html', 'css', 'javascript', 'js', 'python', 'sql'].includes(language.toLowerCase()) && (
                  <button
                    onClick={() => onRunCode(codeText, language.toLowerCase())}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FB4400] hover:bg-[#E03D00] text-white font-medium text-xs transition-colors shadow-sm"
                  >
                    <Play size={12} className="fill-white" />
                    <span>Run in Sandbox</span>
                  </button>
                )}
                <button
                  onClick={() => handleCopy(codeText, codeIndex)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Copy code"
                >
                  {copiedIndex === codeIndex ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400 text-xs font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span className="text-xs">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-slate-200 bg-[#0B0F19]">
              <pre className="!bg-transparent !p-0">
                <code>{codeText}</code>
              </pre>
            </div>
          </div>
        );
        continue;
      }

      // Headings
      if (line.startsWith('# ')) {
        blocks.push(
          <h1 key={`h1-${blockKey++}`} className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight pb-3 border-b border-slate-200 flex items-center gap-3 font-display">
            <span className="text-[#FB4400]">#</span>
            <span>{line.replace('# ', '').trim()}</span>
          </h1>
        );
        i++;
        continue;
      }
      if (line.startsWith('## ')) {
        const headingText = line.replace('## ', '').trim();
        const isIntro = headingText.includes('📘') || headingText.toLowerCase().includes('introduction');
        const isConcepts = headingText.includes('🧠') || headingText.toLowerCase().includes('concepts');
        const isSyntax = headingText.includes('💻') || headingText.toLowerCase().includes('syntax');
        const isExample = headingText.includes('✅') || headingText.toLowerCase().includes('example');

        blocks.push(
          <h2
            key={`h2-${blockKey++}`}
            className={`text-xl md:text-2xl font-bold mt-8 mb-4 tracking-tight flex items-center gap-2.5 font-display ${
              isIntro ? 'text-blue-700' : isConcepts ? 'text-[#FB4400]' : isSyntax ? 'text-amber-700' : isExample ? 'text-emerald-700' : 'text-slate-900'
            }`}
          >
            <span>{headingText}</span>
          </h2>
        );
        i++;
        continue;
      }
      if (line.startsWith('### ')) {
        blocks.push(
          <h3 key={`h3-${blockKey++}`} className="text-lg md:text-xl font-bold text-slate-800 mt-6 mb-3 font-display">
            {line.replace('### ', '').trim()}
          </h3>
        );
        i++;
        continue;
      }

      // Horizontal rule
      if (line.trim() === '---' || line.trim() === '***') {
        blocks.push(<hr key={`hr-${blockKey++}`} className="my-8 border-slate-200" />);
        i++;
        continue;
      }

      // Markdown Tables
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const tableLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
          tableLines.push(lines[i].trim());
          i++;
        }

        if (tableLines.length >= 2) {
          const parseRow = (rowStr: string) =>
            rowStr
              .slice(1, -1)
              .split('|')
              .map(c => c.trim());

          const headerCols = parseRow(tableLines[0]);
          const bodyRows = tableLines.slice(2).map(parseRow);

          blocks.push(
            <div key={`table-${blockKey++}`} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    {headerCols.map((col, cIdx) => (
                      <th key={cIdx} className="px-4 py-3 font-bold">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-3">{renderInlineFormatted(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          continue;
        }
      }

      // Bullet lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const listItems: string[] = [];
        while (i < lines.length && (lines[i].trim().startsWith('- ') || lines[i].trim().startsWith('* '))) {
          listItems.push(lines[i].trim().replace(/^[-*]\s+/, ''));
          i++;
        }
        blocks.push(
          <ul key={`ul-${blockKey++}`} className="my-4 space-y-2 text-slate-700 list-none pl-1">
            {listItems.map((item, lIdx) => (
              <li key={lIdx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#7342E2] mt-2 shrink-0"></span>
                <span className="leading-relaxed">{renderInlineFormatted(item)}</span>
              </li>
            ))}
          </ul>
        );
        continue;
      }

      // Numbered lists
      if (/^\d+\.\s+/.test(line.trim())) {
        const numItems: string[] = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          numItems.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
          i++;
        }
        blocks.push(
          <ol key={`ol-${blockKey++}`} className="my-4 space-y-2 text-slate-700 list-none pl-1">
            {numItems.map((item, nIdx) => (
              <li key={nIdx} className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 border border-purple-200 text-[#7342E2] text-xs font-bold shrink-0 mt-0.5">
                  {nIdx + 1}
                </span>
                <span className="leading-relaxed">{renderInlineFormatted(item)}</span>
              </li>
            ))}
          </ol>
        );
        continue;
      }

      // Blockquotes
      if (line.trim().startsWith('>')) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith('>')) {
          quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
          i++;
        }
        blocks.push(
          <blockquote key={`quote-${blockKey++}`} className="my-4 pl-4 border-l-4 border-[#7342E2] bg-purple-50/70 py-3 px-4 rounded-r-2xl text-slate-800 italic">
            {quoteLines.join(' ')}
          </blockquote>
        );
        continue;
      }

      // Normal paragraph
      if (line.trim().length > 0) {
        blocks.push(
          <p key={`p-${blockKey++}`} className="my-3 text-slate-700 leading-relaxed text-[15px] font-normal">
            {renderInlineFormatted(line)}
          </p>
        );
      }

      i++;
    }

    return blocks;
  };

  // Helper for inline styles
  const renderInlineFormatted = (text: string): React.ReactNode => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

    return parts.map((part, pIdx) => {
      if (!part) return null;

      // Inline code
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={pIdx} className="px-1.5 py-0.5 mx-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[13px] text-[#7342E2] font-semibold">
            {part.slice(1, -1)}
          </code>
        );
      }

      // Bold
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-bold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Links [title](url)
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        return (
          <a
            key={pIdx}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7342E2] hover:text-[#6028D6] underline underline-offset-2 transition-colors font-semibold"
          >
            {linkMatch[1]}
          </a>
        );
      }

      return part;
    });
  };

  return (
    <div className="prose prose-slate max-w-none font-sans">
      {parseMarkdown(content)}
    </div>
  );
};

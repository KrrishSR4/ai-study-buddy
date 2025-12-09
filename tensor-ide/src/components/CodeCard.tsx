import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check, ChevronDown } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CodeCardProps {
  code: {
    python: string;
    java: string;
    javascript: string;
  };
}

type Language = 'python' | 'java' | 'javascript';

const LANGUAGE_CONFIG: Record<Language, { label: string; icon: string }> = {
  python: { label: 'Python', icon: '🐍' },
  java: { label: 'Java', icon: '☕' },
  javascript: { label: 'JavaScript', icon: '⚡' },
};

export function CodeCard({ code }: CodeCardProps) {
  const [activeLanguage, setActiveLanguage] = useState<Language>('python');
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code[activeLanguage]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
      ...vscDarkPlus['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: '1rem',
    },
    'code[class*="language-"]': {
      ...vscDarkPlus['code[class*="language-"]'],
      background: 'transparent',
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Code Implementation</h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            isExpanded && "rotate-180"
          )} />
        </Button>
      </div>
      
      {isExpanded && (
        <>
          {/* Language Tabs */}
          <div className="flex items-center gap-1 px-4 py-2 border-b border-border/30 bg-background/50">
            {(Object.keys(LANGUAGE_CONFIG) as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLanguage(lang)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activeLanguage === lang
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <span>{LANGUAGE_CONFIG[lang].icon}</span>
                <span>{LANGUAGE_CONFIG[lang].label}</span>
              </button>
            ))}
            
            <div className="flex-1" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
          
          {/* Code Block */}
          <div className="code-block max-h-[500px] overflow-auto">
            <SyntaxHighlighter
              language={activeLanguage}
              style={customStyle}
              showLineNumbers
              customStyle={{
                background: 'hsl(222 50% 5%)',
                fontSize: '0.875rem',
                lineHeight: '1.5',
              }}
              lineNumberStyle={{
                color: 'hsl(215 20% 35%)',
                paddingRight: '1rem',
                marginRight: '1rem',
                borderRight: '1px solid hsl(222 30% 15%)',
              }}
            >
              {code[activeLanguage]}
            </SyntaxHighlighter>
          </div>
        </>
      )}
    </motion.div>
  );
}

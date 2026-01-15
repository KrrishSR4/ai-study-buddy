import { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { TopicSuggestion } from '@/types/learning';

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading?: boolean;
}

const TOPIC_SUGGESTIONS: TopicSuggestion[] = [
  { topic: 'Binary Search Trees', category: 'Data Structures' },
  { topic: 'QuickSort', category: 'Algorithms' },
  { topic: 'Operating System Threads', category: 'Systems' },
  { topic: 'Hash Tables', category: 'Data Structures' },
  { topic: 'Dynamic Programming', category: 'Algorithms' },
  { topic: 'REST APIs', category: 'Web Development' },
  { topic: 'Machine Learning Basics', category: 'ML' },
  { topic: 'SQL Joins', category: 'Databases' },
  { topic: 'Recursion', category: 'Fundamentals' },
  { topic: 'Object-Oriented Programming', category: 'Paradigms' },
  { topic: 'Graph Algorithms', category: 'Algorithms' },
  { topic: 'Memory Management', category: 'Systems' },
];

export function TopicInput({ onSubmit, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<TopicSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (topic.length > 0) {
      const filtered = TOPIC_SUGGESTIONS.filter(s =>
        s.topic.toLowerCase().includes(topic.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions(TOPIC_SUGGESTIONS.slice(0, 6));
    }
  }, [topic]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: TopicSuggestion) => {
    setTopic(suggestion.topic);
    setShowSuggestions(false);
    onSubmit(suggestion.topic);
  };

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto relative px-4 sm:px-0">
      <form onSubmit={handleSubmit}>
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative glass-card rounded-xl p-1.5 border border-border/50 group-hover:border-primary/30 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="flex items-center flex-1 gap-2 sm:gap-3 px-3 sm:px-4">
                <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <Input
                  ref={inputRef}
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Enter a topic (e.g., Binary Search Trees...)"
                  className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-sm sm:text-base"
                  disabled={isLoading}
                />
              </div>
              
              <Button
                type="submit"
                disabled={!topic.trim() || isLoading}
                className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Generate</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 mx-4 sm:mx-0 mt-2 bg-card backdrop-blur-xl rounded-xl border border-border shadow-2xl overflow-hidden z-[100]"
          >
            <div className="p-2 max-h-[280px] sm:max-h-[320px] overflow-y-auto">
              <p className="text-xs text-muted-foreground px-3 py-2 uppercase tracking-wider font-semibold">
                Suggested Topics
              </p>
              <div className="space-y-0.5">
                {filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.topic}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSuggestionClick(suggestion);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 sm:py-3 rounded-lg hover:bg-primary/10 active:bg-primary/20 transition-all duration-150 group cursor-pointer"
                  >
                    <span className="text-foreground group-hover:text-primary transition-colors font-medium text-sm sm:text-base">
                      {suggestion.topic}
                    </span>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                      {suggestion.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

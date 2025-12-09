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
  { topic: 'Machine Learning Basics', category: 'AI/ML' },
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
    <div ref={containerRef} className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group" style={{ zIndex: 1001 }}>
          <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative glass-card rounded-xl p-1.5 border border-border/50 group-hover:border-primary/30 transition-colors duration-300">
            <div className="flex items-center gap-2">
              <div className="flex items-center flex-1 gap-3 px-4">
                <Search className="w-5 h-5 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Enter a topic (e.g., Binary Search Trees, QuickSort...)"
                  className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                  disabled={isLoading}
                />
              </div>
              
              <Button
                type="submit"
                disabled={!topic.trim() || isLoading}
                className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full mt-2 glass-card rounded-xl border border-border/50 overflow-hidden z-50 shadow-lg"
              style={{ zIndex: 1000 }}
            >
              <div className="p-2">
                <p className="text-xs text-muted-foreground px-3 py-1.5 uppercase tracking-wider">
                  Suggested Topics
                </p>
                <div className="space-y-1">
                  {filteredSuggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion.topic}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-secondary/50 transition-colors group"
                    >
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {suggestion.topic}
                      </span>
                      <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                        {suggestion.category}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

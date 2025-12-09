import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Lightbulb,
  Code2,
  FlaskConical,
  HelpCircle,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NotesCard } from '@/components/NotesCard';
import { ExplanationCard } from '@/components/ExplanationCard';
import { CodeCard } from '@/components/CodeCard';
import { ExamplesCard } from '@/components/ExamplesCard';
import { QuizCard } from '@/components/QuizCard';
import { cn } from '@/lib/utils';
import type { LearningMaterial, TabType } from '@/types/learning';

interface ResultsProps {
  material: LearningMaterial | null;
  topic: string;
}

const TABS: { id: TabType; icon: React.ElementType; label: string }[] = [
  { id: 'notes', icon: BookOpen, label: 'Notes' },
  { id: 'explanation', icon: Lightbulb, label: 'Explanation' },
  { id: 'code', icon: Code2, label: 'Code' },
  { id: 'examples', icon: FlaskConical, label: 'Examples' },
  { id: 'quiz', icon: HelpCircle, label: 'Quiz' },
];

export function Results({ material, topic }: ResultsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('notes');
  const navigate = useNavigate();

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">No Content Yet</h2>
          <p className="text-muted-foreground mb-6">
            Generate learning materials by entering a topic on the home page.
          </p>
          <Button onClick={() => navigate('/')} className="btn-glow">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'notes':
        return <NotesCard notes={material.notes} topic={topic} />;
      case 'explanation':
        return <ExplanationCard explanation={material.explanation} />;
      case 'code':
        return <CodeCard code={material.code} />;
      case 'examples':
        return <ExamplesCard examples={material.examples} />;
      case 'quiz':
        return <QuizCard quiz={material.quiz} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                  {topic}
                </h1>
                <p className="text-sm text-muted-foreground">
                  AI-generated learning materials
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

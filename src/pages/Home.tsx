import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Lightbulb, FlaskConical, HelpCircle, ArrowRight, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TopicInput } from '@/components/TopicInput';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { DatasetsDialog } from '@/components/DatasetsDialog';
import { runPipeline, type PipelineProgress } from '@/ai/pipeline';
import type { LearningMaterial } from '@/types/learning';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const FEATURES = [
  { icon: BookOpen, title: 'Smart Notes', description: 'Comprehensive study notes with key concepts' },
  { icon: Lightbulb, title: 'Simple Explanations', description: 'Complex topics made easy to understand' },
  { icon: FlaskConical, title: 'Practical Examples', description: 'Real-world input/output demonstrations' },
  { icon: HelpCircle, title: 'Interactive Quiz', description: 'Test your understanding with quizzes' },
];

interface HomeProps {
  onMaterialGenerated: (material: LearningMaterial, topic: string) => void;
}

export function Home({ onMaterialGenerated }: HomeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<PipelineProgress>({ stage: '', progress: 0, message: '' });
  const [showDatasets, setShowDatasets] = useState(false);
  const navigate = useNavigate();

  const handleTopicSubmit = useCallback(async (topic: string) => {
    setIsLoading(true);
    setProgress({ stage: 'starting', progress: 0, message: 'Initializing RAG pipeline...' });

    try {
      const material = await runPipeline(topic, (p) => {
        setProgress(p);
      });
      
      onMaterialGenerated(material, topic);
      
      toast({
        title: 'Learning materials ready!',
        description: `Generated comprehensive content for "${topic}"`,
      });
      
      navigate('/results');
    } catch (error) {
      toast({
        title: 'Generation failed',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, onMaterialGenerated]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-16 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="floating-orb w-[500px] h-[500px] bg-primary/20 top-0 left-1/4 animate-float" />
        <div className="floating-orb w-[400px] h-[400px] bg-accent/15 bottom-0 right-1/4 animate-float" style={{ animationDelay: '-3s' }} />
        <div className="floating-orb w-[300px] h-[300px] bg-primary/10 top-1/2 right-10 animate-float" style={{ animationDelay: '-1.5s' }} />
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">RAG-Powered Learning</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Learn Any Topic with
              <span className="block gradient-text glow-text">Intelligent Content Generation</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
              Enter any computer science topic and get comprehensive notes, explanations, 
              examples, and quizzes — powered by RAG and TensorFlow.js
            </p>
          </motion.div>

          {isLoading ? (
            <LoadingSkeleton
              stage={progress.stage}
              progress={progress.progress}
              message={progress.message}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TopicInput onSubmit={handleTopicSubmit} isLoading={isLoading} />
            </motion.div>
          )}
        </div>
      </section>

      {/* Features Section */}
      {!isLoading && (
        <section className="py-12 sm:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
                Complete Learning Package
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                Get everything you need to master any topic, generated instantly
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass-card-hover rounded-xl p-5 sm:p-6 group"
                >
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
              
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass-card rounded-xl p-5 sm:p-6 bg-hero-gradient border border-primary/20 flex flex-col justify-center sm:col-span-2 lg:col-span-1"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">Ready to Learn?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Enter any topic above to get started with intelligent learning materials.
                </p>
                <div className="flex items-center gap-2 text-primary font-medium text-sm">
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Resources Section */}
      {!isLoading && (
        <section className="py-12 sm:py-16 px-4 border-t border-border/30">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              {/* Built with TensorFlow.js */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 sm:mb-8">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path className="text-accent" d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.416 5.393l-6.168-3.564v14.02L12.46 24V0l10.248 5.856v5.393z"/>
                </svg>
                <span className="text-sm text-accent font-semibold">Powered by RAG & TensorFlow.js</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-6">Training Data</h3>
              
              {/* View Datasets Button */}
              <Button
                onClick={() => setShowDatasets(true)}
                className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium mb-8"
              >
                <Database className="w-5 h-5 mr-2" />
                View Datasets
              </Button>

              {/* Dataset badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
                {['CodeXGLUE', 'The Stack', 'Wikipedia', 'ELI5', 'OpenBookQA', 'BoolQ', 'MCTest'].map((dataset) => (
                  <span key={dataset} className="px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-default">
                    {dataset}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Datasets Dialog */}
      <DatasetsDialog isOpen={showDatasets} onClose={() => setShowDatasets(false)} />
    </div>
  );
}

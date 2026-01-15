import { X, ExternalLink, Code2, BookOpen, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DatasetsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DATASETS = {
  code: [
    { name: 'CodeXGLUE', url: 'https://github.com/microsoft/CodeXGLUE', description: 'General Language Understanding Evaluation benchmark for Code' },
    { name: 'The Stack', url: 'https://huggingface.co/datasets/bigcode/the-stack', description: 'Large-scale pretraining dataset for code' },
  ],
  notes: [
    { name: 'Wikipedia CS Articles', url: 'https://huggingface.co/datasets/wikipedia', description: 'Computer Science articles from Wikipedia' },
    { name: 'ELI5', url: 'https://huggingface.co/datasets/eli5', description: 'Explain Like I\'m Five - Long form question answering' },
    { name: 'DS-NLP Notes', url: 'https://huggingface.co/datasets/TalTechNLP/DS-NLP-Notes', description: 'Data Science and NLP educational notes' },
  ],
  quiz: [
    { name: 'OpenBookQA', url: 'https://huggingface.co/datasets/openbookqa', description: 'Open book question answering dataset' },
    { name: 'BoolQ', url: 'https://huggingface.co/datasets/boolq', description: 'Boolean Yes/No question answering' },
    { name: 'MCTest', url: 'https://huggingface.co/datasets/mctest', description: 'Machine Comprehension Test dataset' },
  ],
};

export function DatasetsDialog({ isOpen, onClose }: DatasetsDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl max-h-[85vh] overflow-y-auto glass-card rounded-2xl border border-border/50 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-xl p-4 sm:p-6 border-b border-border/50 flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">Training Datasets</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Code Datasets */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Code2 className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">🧑‍💻 Code Datasets</h3>
                </div>
                <div className="space-y-3">
                  {DATASETS.code.map((dataset) => (
                    <a
                      key={dataset.name}
                      href={dataset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/30 transition-all group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">{dataset.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{dataset.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-3" />
                    </a>
                  ))}
                </div>
              </section>

              {/* Notes & Explanations */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">📚 Notes & Explanations</h3>
                </div>
                <div className="space-y-3">
                  {DATASETS.notes.map((dataset) => (
                    <a
                      key={dataset.name}
                      href={dataset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-accent/30 transition-all group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground group-hover:text-accent transition-colors">{dataset.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{dataset.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 ml-3" />
                    </a>
                  ))}
                </div>
              </section>

              {/* Quiz Datasets */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">📝 Quiz Datasets</h3>
                </div>
                <div className="space-y-3">
                  {DATASETS.quiz.map((dataset) => (
                    <a
                      key={dataset.name}
                      href={dataset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 border border-border/30 hover:border-primary/30 transition-all group"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">{dataset.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{dataset.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-3" />
                    </a>
                  ))}
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

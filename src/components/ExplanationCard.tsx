import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExplanationCardProps {
  explanation: string;
}

export function ExplanationCard({ explanation }: ExplanationCardProps) {
  const renderContent = () => {
    const lines = explanation.split('\n');
    const elements: JSX.Element[] = [];
    
    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        elements.push(
          <motion.h2
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
            className="text-xl font-semibold text-foreground mb-4 mt-6 first:mt-0"
          >
            {line.replace('## ', '')}
          </motion.h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <motion.h3
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
            className="text-lg font-medium text-primary mb-3 mt-5"
          >
            {line.replace('### ', '')}
          </motion.h3>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.02 }}
            className="flex items-start gap-3 mb-2 ml-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <p className="text-muted-foreground">{line.replace('- ', '')}</p>
          </motion.div>
        );
      } else if (line.match(/^\d+\./)) {
        const match = line.match(/^(\d+)\.\s+\*\*(.+?)\*\*:?\s*(.*)$/);
        if (match) {
          elements.push(
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className="flex items-start gap-3 mb-3 ml-4"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex-shrink-0">
                {match[1]}
              </span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{match[2]}</span>
                {match[3] && `: ${match[3]}`}
              </p>
            </motion.div>
          );
        } else {
          elements.push(
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className="text-muted-foreground mb-2 ml-4"
            >
              {line}
            </motion.p>
          );
        }
      } else if (line.trim()) {
        elements.push(
          <motion.p
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.02 }}
            className="text-muted-foreground mb-4 leading-relaxed"
          >
            {line}
          </motion.p>
        );
      }
    });
    
    return elements;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Simple Explanation</h3>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {renderContent()}
      </div>
    </motion.div>
  );
}

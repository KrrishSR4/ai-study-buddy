import { motion } from 'framer-motion';
import { FlaskConical, ArrowRight } from 'lucide-react';
import type { Example } from '@/types/learning';

interface ExamplesCardProps {
  examples: Example[];
}

export function ExamplesCard({ examples }: ExamplesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <FlaskConical className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Practical Examples</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">#</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Input</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground"></th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Output</th>
            </tr>
          </thead>
          <tbody>
            {examples.map((example, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-border/30 hover:bg-secondary/30 transition-colors group"
              >
                <td className="py-4 px-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {index + 1}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <code className="text-sm font-mono text-code-variable bg-secondary/50 px-2 py-1 rounded">
                    {example.input}
                  </code>
                </td>
                <td className="py-4 px-2">
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </td>
                <td className="py-4 px-4">
                  <code className="text-sm font-mono text-code-string bg-secondary/50 px-2 py-1 rounded">
                    {example.output}
                  </code>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 space-y-4">
        <h4 className="text-sm font-medium text-foreground">Explanations</h4>
        {examples.map((example, index) => (
          example.explanation && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/30"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0">
                {index + 1}
              </span>
              <p className="text-sm text-muted-foreground">{example.explanation}</p>
            </motion.div>
          )
        ))}
      </div>
    </motion.div>
  );
}

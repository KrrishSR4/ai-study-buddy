import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  stage?: string;
  progress?: number;
  message?: string;
}

export function LoadingSkeleton({ stage, progress = 0, message }: LoadingSkeletonProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-2xl p-8 max-w-2xl mx-auto"
    >
      <div className="flex flex-col items-center text-center">
        {/* Animated Brain Icon */}
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full border-4 border-primary/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-4xl">🧠</span>
          </motion.div>
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {message || 'Generating learning materials...'}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-6">
          Our AI is preparing comprehensive content for you
        </p>
        
        {/* Progress Bar */}
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground capitalize">{stage || 'Initializing'}</span>
            <span className="text-xs text-primary font-medium">{progress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-primary rounded-full"
              style={{
                boxShadow: '0 0 20px hsl(187 92% 50% / 0.5)',
              }}
            />
          </div>
        </div>
        
        {/* Skeleton Cards */}
        <div className="w-full mt-8 space-y-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30"
            >
              <div className="w-10 h-10 rounded-lg skeleton-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 skeleton-pulse" />
                <div className="h-3 w-1/2 skeleton-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

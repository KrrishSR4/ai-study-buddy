import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/types/learning';

interface QuizCardProps {
  quiz: QuizQuestion[];
}

interface QuizState {
  currentQuestion: number;
  answers: Record<string, string | number>;
  showResults: boolean;
  submitted: Record<string, boolean>;
}

export function QuizCard({ quiz }: QuizCardProps) {
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: {},
    showResults: false,
    submitted: {},
  });

  const [shortAnswerInputs, setShortAnswerInputs] = useState<Record<string, string>>({});

  const currentQ = quiz[state.currentQuestion];

  const handleAnswer = (questionId: string, answer: string | number) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  };

  const handleSubmitQuestion = (questionId: string) => {
    setState(prev => ({
      ...prev,
      submitted: { ...prev.submitted, [questionId]: true },
    }));
  };

  const handleNext = () => {
    if (state.currentQuestion < quiz.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    } else {
      setState(prev => ({ ...prev, showResults: true }));
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestion > 0) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
      }));
    }
  };

  const handleReset = () => {
    setState({
      currentQuestion: 0,
      answers: {},
      showResults: false,
      submitted: {},
    });
    setShortAnswerInputs({});
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.forEach(q => {
      const userAnswer = state.answers[q.id];
      if (q.type === 'short-answer') {
        const correctAnswer = String(q.correctAnswer).toLowerCase().trim();
        const userAnswerStr = String(userAnswer || '').toLowerCase().trim();
        if (userAnswerStr.includes(correctAnswer) || correctAnswer.includes(userAnswerStr)) {
          correct++;
        }
      } else if (userAnswer === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const isCorrect = (question: QuizQuestion) => {
    const userAnswer = state.answers[question.id];
    if (question.type === 'short-answer') {
      const correctAnswer = String(question.correctAnswer).toLowerCase().trim();
      const userAnswerStr = String(userAnswer || '').toLowerCase().trim();
      return userAnswerStr.includes(correctAnswer) || correctAnswer.includes(userAnswerStr);
    }
    return userAnswer === question.correctAnswer;
  };

  if (state.showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-6 md:p-8"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
          >
            <Trophy className="w-10 h-10 text-primary" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h3>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-5xl font-bold gradient-text">{score}</span>
            <span className="text-2xl text-muted-foreground">/ {quiz.length}</span>
          </div>
          
          <div className="w-full max-w-xs mx-auto h-3 bg-secondary rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={cn(
                "h-full rounded-full",
                percentage >= 80 ? "bg-green-500" :
                percentage >= 60 ? "bg-yellow-500" :
                "bg-destructive"
              )}
            />
          </div>
          
          <p className="text-muted-foreground mb-6">
            {percentage >= 80 ? "Excellent work! You've mastered this topic!" :
             percentage >= 60 ? "Good job! Keep practicing to improve." :
             "Keep studying and try again!"}
          </p>
          
          <Button onClick={handleReset} className="btn-glow">
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
        
        {/* Detailed Results */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <h4 className="font-medium text-foreground mb-4">Question Review</h4>
          <div className="space-y-3">
            {quiz.map((q, index) => (
              <div
                key={q.id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg",
                  isCorrect(q) ? "bg-green-500/10" : "bg-destructive/10"
                )}
              >
                <div className="flex items-center gap-3">
                  {isCorrect(q) ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                  <span className="text-sm text-foreground">Question {index + 1}</span>
                </div>
                <span className="text-xs text-muted-foreground capitalize">{q.type}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Knowledge Quiz</h3>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-primary">{state.currentQuestion + 1}</span>
          <span>/</span>
          <span>{quiz.length}</span>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((state.currentQuestion + 1) / quiz.length) * 100}%` }}
          className="h-full bg-primary rounded-full"
        />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium flex-shrink-0">
              {state.currentQuestion + 1}
            </span>
            <div>
              <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-secondary text-muted-foreground mb-2 capitalize">
                {currentQ.type.replace('-', ' ')}
              </span>
              <p className="text-lg text-foreground">{currentQ.question}</p>
            </div>
          </div>
          
          {currentQ.type === 'short-answer' ? (
            <div className="space-y-3">
              <Input
                value={shortAnswerInputs[currentQ.id] || ''}
                onChange={(e) => {
                  setShortAnswerInputs(prev => ({
                    ...prev,
                    [currentQ.id]: e.target.value,
                  }));
                  handleAnswer(currentQ.id, e.target.value);
                }}
                placeholder="Type your answer..."
                className="bg-secondary/50 border-border/50 focus:border-primary/50"
                disabled={state.submitted[currentQ.id]}
              />
              {!state.submitted[currentQ.id] && (
                <Button
                  onClick={() => handleSubmitQuestion(currentQ.id)}
                  disabled={!state.answers[currentQ.id]}
                  size="sm"
                >
                  Check Answer
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {currentQ.options?.map((option, index) => {
                const isSelected = state.answers[currentQ.id] === index;
                const isSubmitted = state.submitted[currentQ.id];
                const isCorrectOption = currentQ.correctAnswer === index;

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isSubmitted) {
                        handleAnswer(currentQ.id, index);
                        handleSubmitQuestion(currentQ.id);
                      }
                    }}
                    disabled={isSubmitted}
                    className={cn(
                      "quiz-option w-full text-left flex items-center gap-3",
                      isSubmitted && isSelected && !isCorrectOption && "incorrect",
                      isSubmitted && isCorrectOption && "correct",
                      isSelected && !isSubmitted && "selected"
                    )}
                  >
                    <span className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium flex-shrink-0 transition-colors",
                      isSubmitted && isCorrectOption
                        ? "border-green-500 bg-green-500/10 text-green-500"
                        : isSubmitted && isSelected && !isCorrectOption
                        ? "border-red-500 bg-red-500/10 text-red-500"
                        : isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-foreground">{option}</span>
                    {isSubmitted && isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                    {isSubmitted && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
          
          {/* Explanation */}
          <AnimatePresence>
            {state.submitted[currentQ.id] && currentQ.explanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-lg bg-secondary/30 border border-border/30"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Explanation: </span>
                  {currentQ.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
      
      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={state.currentQuestion === 0}
          className="border-border/50"
        >
          Previous
        </Button>
        
        <div className="flex gap-1">
          {quiz.map((_, index) => (
            <button
              key={index}
              onClick={() => setState(prev => ({ ...prev, currentQuestion: index }))}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                state.currentQuestion === index
                  ? "bg-primary scale-125"
                  : state.answers[quiz[index].id] !== undefined
                  ? "bg-primary/50"
                  : "bg-secondary"
              )}
            />
          ))}
        </div>
        
        <Button
          onClick={handleNext}
          disabled={!state.submitted[currentQ.id]}
          className="btn-glow"
        >
          {state.currentQuestion === quiz.length - 1 ? 'See Results' : 'Next'}
        </Button>
      </div>
    </motion.div>
  );
}

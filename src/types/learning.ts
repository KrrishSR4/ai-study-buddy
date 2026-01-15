export interface LearningMaterial {
  notes: string;
  explanation: string;
  code: {
    python: string;
    java: string;
    javascript: string;
  };
  examples: Example[];
  quiz: QuizQuestion[];
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface TopicSuggestion {
  topic: string;
  category: string;
}

export type TabType = 'notes' | 'explanation' | 'examples' | 'quiz';

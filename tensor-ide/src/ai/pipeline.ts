// AI Pipeline Module
// Orchestrates the complete learning material generation process

import { topicEmbedder } from './embedding';
import { retrieveRelevantData, DATASET_SOURCES } from './retrieval';
import { generateNotes, generateExplanation, generateCode, generateExamples, generateQuiz } from './generators';
import type { LearningMaterial } from '@/types/learning';

export interface PipelineProgress {
  stage: string;
  progress: number;
  message: string;
}

export type ProgressCallback = (progress: PipelineProgress) => void;

/**
 * Main AI Pipeline
 * Generates complete learning materials for a given topic
 */
export async function runPipeline(
  topic: string,
  onProgress?: ProgressCallback
): Promise<LearningMaterial> {
  const stages = [
    { name: 'embedding', message: 'Analyzing topic...' },
    { name: 'retrieval', message: 'Retrieving relevant data...' },
    { name: 'notes', message: 'Generating notes...' },
    { name: 'explanation', message: 'Creating explanation...' },
    { name: 'code', message: 'Writing code examples...' },
    { name: 'examples', message: 'Preparing practical examples...' },
    { name: 'quiz', message: 'Generating quiz questions...' },
    { name: 'complete', message: 'Done!' },
  ];

  const updateProgress = (stageIndex: number) => {
    if (onProgress) {
      const progress = Math.round((stageIndex / (stages.length - 1)) * 100);
      onProgress({
        stage: stages[stageIndex].name,
        progress,
        message: stages[stageIndex].message,
      });
    }
  };

  try {
    // Stage 1: Generate topic embedding
    updateProgress(0);
    const embedding = await topicEmbedder(topic);

    // Stage 2: Retrieve relevant data from datasets
    updateProgress(1);
    const retrievedData = await retrieveRelevantData(embedding);

    // Stage 3-7: Generate content in parallel where possible
    updateProgress(2);
    const notes = await generateNotes(retrievedData, topic);

    updateProgress(3);
    const explanation = await generateExplanation(retrievedData, topic);

    updateProgress(4);
    const code = await generateCode(retrievedData, topic);

    updateProgress(5);
    const examples = await generateExamples(retrievedData, topic);

    updateProgress(6);
    const quiz = await generateQuiz(retrievedData, topic);

    updateProgress(7);

    return {
      notes,
      explanation,
      code,
      examples,
      quiz,
    };
  } catch (error) {
    console.error('Pipeline error:', error);
    throw new Error(`Failed to generate learning materials: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get dataset source information
 */
export function getDatasetSources() {
  return DATASET_SOURCES;
}

/**
 * Validate topic input
 */
export function validateTopic(topic: string): { valid: boolean; message?: string } {
  if (!topic || topic.trim().length === 0) {
    return { valid: false, message: 'Please enter a topic' };
  }
  
  if (topic.trim().length < 2) {
    return { valid: false, message: 'Topic must be at least 2 characters' };
  }
  
  if (topic.trim().length > 100) {
    return { valid: false, message: 'Topic must be less than 100 characters' };
  }
  
  return { valid: true };
}

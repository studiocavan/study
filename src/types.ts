export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Language = 'kotlin' | 'typescript';
export type Section = 'algorithms' | 'frontend' | 'system-design';

export interface CodeSolution {
  kotlin?: string;
  typescript?: string;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface Quiz {
  question: string;
  codeSnippet: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  pattern: string;
  topic: string;
  leetcodeUrl?: string;
  description: string;
  hints: string[];
  solution: CodeSolution;
  examples?: Example[];
  quiz?: Quiz;
}

export interface Topic {
  id: string;
  title: string;
  section: Section;
  description: string;
  problems: Problem[];
}

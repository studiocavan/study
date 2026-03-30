export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type Language = 'kotlin' | 'typescript';
export type Section = 'algorithms' | 'frontend';

export interface CodeSolution {
  kotlin?: string;
  typescript?: string;
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
}

export interface Topic {
  id: string;
  title: string;
  section: Section;
  description: string;
  problems: Problem[];
}

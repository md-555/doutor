// SPDX-License-Identifier: MIT
/**
 * @fileoverview Tipos para sistema de memória conversacional
 */

export type MemoryMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
};

export type SenseiRunRecord = {
  id: string;
  timestamp: string;
  cwd: string;
  argv: string[];
  version?: string;
  ok?: boolean;
  exitCode?: number;
  durationMs?: number;
  error?: string;
};

export type SenseiContextState = {
  schemaVersion: 1;
  lastRuns: SenseiRunRecord[];
  preferences: Record<string, unknown>;
};

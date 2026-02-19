// SPDX-License-Identifier: MIT
/**
 * Tipos para o conselheiro doutoral
 */

/**
 * Contexto para emissão de conselhos doutor
 */
export interface ConselhoContextoDoutoral {
  hora?: number;
  arquivosParaCorrigir?: number;
  arquivosParaPodar?: number;
  totalOcorrenciasAnaliticas?: number;
  integridadeGuardian?: string;
}

// src/types/api.ts
export interface HealthResponse {
  status: string;
  timestamp: string;
  message: string;
}

export interface ValidarResponse {
  is_valid: boolean;
  row_sums: number[];
  message: string;
}

export interface CalcularResponse {
  success: boolean;
  final_result: number[][];
  intermediate_steps: StepDetail[];
  total_steps: number;
  input_dimensions: {
    matrix_p: number[];
    vector_v: number[];
  };
}

export interface StepDetail {
  step: number;
  input_vector: number[];
  operations: Operation[];
  sums: SumDetail[];
  result: number[];
}

export interface Operation {
  row: number;
  multiplications: Multiplication[];
  expression: string;
}

export interface Multiplication {
  matrix_value: number;
  vector_value: number;
  product: number;
  expression: string;
}

export interface SumDetail {
  row: number;
  terms: number[];
  expression: string;
  total: number;
}
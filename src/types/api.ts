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
  total_steps: number;
  input_dimensions: {
    matrix_p: number[];
    vector_v: number[];
  };
  intermediate_steps?: any[];
}
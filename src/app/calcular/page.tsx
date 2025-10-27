"use client";
import { useState } from "react";
import { CalcularResponse, ValidarResponse } from "../../types/api";
import "./Calc.css"; 

export default function CalcularPage() {
  const [matrix, setMatrix] = useState<string>(
    "[[0.8,0.1,0.1,0.0],[0.6,0.3,0.1,0.0],[0.2,0.3,0.4,0.1],[0.0,0.1,0.4,0.5]]"
  );
  const [vector, setVector] = useState<string>("[1,0,0,0]");
  const [steps, setSteps] = useState<number>(10);
  const [validResult, setValidResult] = useState<ValidarResponse | null>(null);
  const [calcResult, setCalcResult] = useState<CalcularResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validarMatriz = async () => {
    try {
      setError(null);
      setValidResult(null);
      setCalcResult(null);
      
      const matrixParsed = JSON.parse(matrix);

      const res = await fetch("https://backend-markov.onrender.com/validar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix_p: matrixParsed}),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = (await res.json()) as ValidarResponse;
      setValidResult(data);

      if (!data.is_valid) {
        setError(" La matriz no es válida: las filas deben sumar 1.");
      }
    } catch {
      setError("Error al validar la matriz");
    }
  };

  const calcular = async () => {
    if (!validResult?.is_valid) {
      setError(" Primero valida una matriz correcta antes de calcular.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setCalcResult(null);

      const matrixParsed = JSON.parse(matrix);
      const vectorParsed = JSON.parse(vector);

      const res = await fetch("https://backend-markov.onrender.com/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matrix_p: matrixParsed,
          vector_v: vectorParsed,
          steps,
        }),
      });

      const data = (await res.json()) as CalcularResponse;
      // Convertimos solo la matriz final en array de arrays
      setCalcResult(data);
    } catch {
      setError(" Error al calcular la cadena de Markov");
    } finally {
      setLoading(false);
    }
  };
  
  const formatVector = (vec: number[]) =>
    vec.map((v) => v.toFixed(4)).join("\n");

  return (
  <div className="terminal">
<pre className="ascii-titles">
{`
███████ ██ ███    ███ ██    ██ ██      █████   ██████ ██  ██████  ███    ██    
██      ██ ████  ████ ██    ██ ██     ██   ██ ██      ██ ██    ██ ████   ██    
███████ ██ ██ ████ ██ ██    ██ ██     ███████ ██      ██ ██    ██ ██ ██  ██    
     ██ ██ ██  ██  ██ ██    ██ ██     ██   ██ ██      ██ ██    ██ ██  ██ ██    
███████ ██ ██      ██  ██████  ██████ ██   ██  ██████ ██  ██████  ██   ████ 

Cadenas de Markov. ████████████████████████████████████████████████████████

`}
</pre>
    <p>
      Ingresa la <b>matriz de transición</b> y el <b>vector inicial</b>.
      si es correcta, podrás calcular los pasos.
    </p>

    <div className="input-section">
      {/* Columna izquierda */}
      <div className="matrix-box">
        <label>Matriz de transición (P):</label>
        <textarea
          className="terminal-textarea"
          value={matrix}
          onChange={(e) => setMatrix(e.target.value)}
        />
      </div>

      {/* Columna derecha */}
      <div className="right-box">
        <div>
          <label>Vector inicial (V):</label>
          <br />
          <input
            className="terminal-input"
            value={vector}
            onChange={(e) => setVector(e.target.value)}
          />
        </div>

        <div>
          <label>Pasos:</label>
          <br />
          <input
            className="terminal-input"
            type="number"
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
          />
        </div>
        <div className="buttonsMatrix">
        <button className="terminal-button" onClick={validarMatriz}>
          Validar Matriz
        </button>

        <button
          className="terminal-button"
          onClick={calcular}
          disabled={!validResult?.is_valid || loading}
        >
          {loading ? "Calculando..." : "Calcular"}
        </button>
         </div>
      </div>
    </div>

    {error && <p className="error">{error}</p>}

    {validResult && (
      <div className="status-box">
        <p>
          Validación:{" "}
          {validResult.is_valid ? "✓ Matriz válida" : "✗ Matriz inválida"}
        </p>
      </div>
    )}

    {calcResult && (
      <>
        <div className="status-box">
          <p>Resultado final para el día {steps}:</p>
          <pre>{formatVector(calcResult.final_result.flat())}</pre>
        </div>
      
        <div className="steps-container">
            <h3 className="steps-title"> Pasos Detallados del Cálculo</h3>
            
            {calcResult.intermediate_steps.map((step, index) => (
              <div key={index} className="step-box">
                <h4 className="step-header">
                  ═══════════════════════════════════════════════════════
                  <br />
                  PASO {step.step} de {steps}
                  <br />
                  ═══════════════════════════════════════════════════════
                </h4>

                {/* 1. Multiplicación Fila × Columna */}
                <div className="step-section">
                  <p className="step-subtitle">1. MULTIPLICACIÓN FILA × COLUMNA:</p>
                  <div className="step-content">
                    {step.operations.map((op, i) => (
                      <p key={i} className="operation-line">
                        Fila {op.row}: [{op.expression}]
                      </p>
                    ))}
                  </div>
                </div>

                {/* 2. Operando (Productos) */}
                <div className="step-section">
                  <p className="step-subtitle">2. OPERANDO (PRODUCTOS):</p>
                  <div className="step-content">
                    {step.sums.map((sum, i) => (
                      <p key={i} className="operation-line">
                        Fila {sum.row}: [{sum.expression}] = {sum.total.toFixed(4)}
                      </p>
                    ))}
                  </div>
                </div>

                {/* 3. Resultado */}
                <div className="step-section">
                  <p className="step-subtitle">3. RESULTADO:</p>
                  <div className="step-content">
                    <pre className="result-vector">
                      {step.result.map((val, i) => `[${val.toFixed(4)}]`).join('\n')}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
);

}
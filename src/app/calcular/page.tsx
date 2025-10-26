"use client";
import { useState } from "react";
import { CalcularResponse, ValidarResponse } from "../../types/api";
import "./Calc.css"; 

export default function CalcularPage() {
  const [matrix, setMatrix] = useState<string>(
    "[[0.8,0.1,0.1,0.0],[0.6,0.3,0.1,0.0],[0.2,0.3,0.4,0.1],[0.0,0.1,0.4,0.5]]"
  );
  const [vector, setVector] = useState<string>("[1,0,0,0]");
  const [steps, setSteps] = useState<number>(3);
  const [validResult, setValidResult] = useState<ValidarResponse | null>(null);
  const [calcResult, setCalcResult] = useState<number[][] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validarMatriz = async () => {
    try {
      setError(null);
      setValidResult(null);
      setCalcResult(null);

      const res = await fetch("https://backend-markov.onrender.com/validar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matrix_p: JSON.parse(matrix) }),
      });

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

      const res = await fetch("https://backend-markov.onrender.com/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matrix_p: JSON.parse(matrix),
          vector_v: JSON.parse(vector),
          steps,
        }),
      });

      const data = (await res.json()) as CalcularResponse;
      // Convertimos solo la matriz final en array de arrays
      setCalcResult(data.final_result);
    } catch {
      setError(" Error al calcular la cadena de Markov");
    } finally {
      setLoading(false);
    }
  };

  const formatMatrix = (mat: number[][]) =>
    mat.map((row) => row.map((v) => v.toFixed(4)).join("  ")).join("\n");

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
      <div className="status-box">
        <p>Resultado final después de {steps} pasos:</p>
        <pre>{formatMatrix(calcResult)}</pre>
      </div>
    )}
  </div>
);

}

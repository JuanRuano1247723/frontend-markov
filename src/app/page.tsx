"use client";

import { useState } from "react";
import { HealthResponse } from "../types/api";
import "./stylesHome.css";

export default function HomePage() {
  const [status, setStatus] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    try {
      const res = await fetch("https://backend-markov.onrender.com/health");
      const data = (await res.json()) as HealthResponse;
      setStatus(data);
      setError(null);
    } catch {
      setError("*No fue posible la conexión*");
    }
  };

  return (
    <div className="terminal2">
  <pre className="ascii-logo2">{`
███    ███  █████  ███████ ██   ██ ███████ ██████  ██     ██ ███    ██ ██   ██ 
████  ████ ██   ██ ██      ██  ██  ██      ██   ██ ██     ██ ████   ██ ██  ██  
██ ████ ██ ███████ ███████ █████   █████   ██████  ██     ██ ██ ██  ██ █████   
██  ██  ██ ██   ██      ██ ██  ██  ██      ██   ██ ██     ██ ██  ██ ██ ██  ██  
██      ██ ██   ██ ███████ ██   ██ ███████ ██   ██ ██████ ██ ██   ████ ██   ██ 

M A S K E R L I N K   T E R M I N A L █████████████████████████████████████████
               
Markov / Matrix Simulation Engine
`}</pre>

      <div className="content2">
        <button className="terminal-button2" onClick={checkHealth}>
          Verificar conexión
        </button>

        {error && <p className="error2">{error}</p>}

        {status && (
          <div className="status-box2">
            <p>{status.message}</p>
            <p>{new Date(status.timestamp).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
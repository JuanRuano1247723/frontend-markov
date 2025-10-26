"use client";
import "./acerca.css";

export default function AboutPage() {
  return (
    <div className="terminaAbout-container">
   <pre className="ascii-title">{`
███    ███  █████  ███████ ██   ██ ███████ ██████  ██     ██ ███    ██ ██   ██ 
████  ████ ██   ██ ██      ██  ██  ██      ██   ██ ██     ██ ████   ██ ██  ██  
██ ████ ██ ███████ ███████ █████   █████   ██████  ██     ██ ██ ██  ██ █████   
██  ██  ██ ██   ██      ██ ██  ██  ██      ██   ██ ██     ██ ██  ██ ██ ██  ██  
██      ██ ██   ██ ███████ ██   ██ ███████ ██   ██ ██████ ██ ██   ████ ██   ██ 

M A S K E R L I N K   T E R M I N A L █████████████████████████████████████████
            
`}</pre>


      <h2 className="about-title">Cadenas de Markov</h2>
      <p className="about-text">
        Una <b>cadena de Markov</b> es un modelo matemático que describe un proceso
        en el cual el estado futuro depende únicamente del estado actual, y no de
        los estados pasados, en otras palabras el sistema “no tiene memoria”.
      </p>

      <p className="about-text">
        Este tipo de modelos se representa mediante una <b>matriz de transición</b>,
        donde cada valor indica la probabilidad de pasar de un estado a otro,
        estas probabilidades deben sumar 1 en cada fila.
      </p>

      <h3 className="about-subtitle">Usos prácticos</h3>
      <ul className="about-list">
        <li>
          <b>Economía:</b> predicción de comportamientos de mercado o cadenas de
          producción.
        </li>
        <li>
          <b>Inteligencia artificial:</b> modelar secuencias de decisiones,
          reconocimiento de voz o sistemas predictivos.
        </li>
        <li>
          <b>Informática:</b> análisis de rendimiento de sistemas, planificación
          probabilística o simulaciones.
        </li>
        <li>
          <b>Biología:</b> modelar mutaciones genéticas o procesos estocásticos.
        </li>
      </ul>

      <div className="about-box">
        <p>
          En esta aplicación, puedes <b>validar y simular</b> cadenas de Markov
          ingresando una matriz de transición y un vector inicial,
          el simulador muestra cómo evolucionan las probabilidades a través de los pasos.
        </p>
      </div>

      <p className="about-footer">Desarrollado como herramienta educativa para entender procesos estocásticos.</p>
    </div>
  );
}

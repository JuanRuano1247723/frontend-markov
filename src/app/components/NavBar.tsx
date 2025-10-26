"use client";
import "./Nav.css";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="terminal-nav">
      <ul className="nav-list">
        <li>
          <Link href="/">Inicio</Link>
        </li>
        <li>
          <Link href="/calcular">Simulación</Link>
        </li>
        <li>
          <Link href="/acerca">Acerca</Link>
        </li>
      </ul>
    </nav>
  );
}
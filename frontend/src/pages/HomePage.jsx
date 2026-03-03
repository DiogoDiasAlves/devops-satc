import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="left">
          <h2>APIs públicas — demos rápidas</h2>
          <p>Consuma dados públicos em tempo real e visualize exemplos úteis para DevOps/SRE.</p>
          <a className="cta" href="/rick">Ver personagens do Rick & Morty</a>
        </div>
        <div className="right">
          <img src="https://via.placeholder.com/260x140.png?text=API" alt="api" style={{ borderRadius:8 }} />
        </div>
      </section>

      <div className="grid">
        <div className="card">
          <h4>Rick & Morty</h4>
          <p style={{ color:'#94a3b8' }}>Busca por personagens, paginação e detalhes.</p>
          <Link to="/rick" className="btn" style={{ marginTop:8 }}>Abrir</Link>
        </div>

        <div className="card">
          <h4>Open Trivia</h4>
          <p style={{ color:'#94a3b8' }}>Perguntas aleatórias para quizzes.</p>
          <Link to="/trivia" className="btn" style={{ marginTop:8 }}>Abrir</Link>
        </div>
      </div>
    </div>
  )
}

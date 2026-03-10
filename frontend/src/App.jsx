import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RickAndMortyPage from './pages/RickAndMortyPage'
import TriviaPage from './pages/TriviaPage'

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="app-header">
          <div className="brand">
            <span className="logo" />
            <h1>DevOps SATC</h1>
          </div>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/rick">Rick & Morty</Link>
            <Link to="/trivia">Trivia</Link>
          </nav>
        </header>

        <main className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rick" element={<RickAndMortyPage />} />
            <Route path="/trivia" element={<TriviaPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

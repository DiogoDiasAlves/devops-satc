import React, { useEffect, useState } from 'react'
import { fetchCharacters, searchCharacters } from '../services/rickAndMortyService'

function CharacterCard({ c }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: 8, borderRadius: 6 }}>
      <img src={c.image} alt={c.name} width={120} style={{ borderRadius: 6 }} />
      <h4>{c.name}</h4>
      <div>{c.species} — {c.status}</div>
    </div>
  )
}

export default function RickAndMortyPage(){
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    load()
  },[page])

  function load(){
    setLoading(true)
    fetchCharacters(page).then(data => {
      setData(data)
    }).catch(err => setError(err.message || 'Erro')).finally(()=>setLoading(false))
  }

  function handleSearch(e){
    e.preventDefault()
    if(!q) return load()
    setLoading(true)
    searchCharacters(q).then(data => {
      setData(data)
    }).catch(err => setError(err.message || 'Erro')).finally(()=>setLoading(false))
  }

  return (
    <div style={{ padding:24 }}>
      <h2>Rick & Morty — Characters</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: 12 }}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search name" />
        <button style={{ marginLeft: 8 }} type="submit">Search</button>
        <button type="button" onClick={()=>{setQ(''); setPage(1); load()}} style={{ marginLeft:8 }}>Reset</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {data && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap:12 }}>
            {data.results.map(c => (
              <CharacterCard key={c.id} c={c} />
            ))}
          </div>

          <div style={{ marginTop: 16, display:'flex', gap:8, justifyContent:'center', alignItems:'center' }}>
            <button className="arrow-btn" disabled={!data.info.prev} onClick={()=>setPage(p=>Math.max(1,p-1))} aria-label="Previous">
              <span className="left">‹</span>
            </button>

            <div className="muted">Page {page} / {data.info.pages}</div>

            <button className="arrow-btn" disabled={!data.info.next} onClick={()=>setPage(p=>p+1)} aria-label="Next">
              <span className="right">›</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

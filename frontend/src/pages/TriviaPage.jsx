import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { fetchTrivia } from '../services/triviaService'

function Question({ q }){
  const answers = q.incorrect_answers.concat(q.correct_answer)
  return (
    <div style={{ border:'1px solid #ddd', padding:8, borderRadius:6 }}>
      <div dangerouslySetInnerHTML={{ __html: q.question }} />
      <div style={{ marginTop:8 }}>
        {answers.map((a)=> (
          <div key={a} dangerouslySetInnerHTML={{ __html: a }} />
        ))}
      </div>
    </div>
  )
}

Question.propTypes = {
  q: PropTypes.shape({
    question: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    correct_answer: PropTypes.string.isRequired
  }).isRequired
}

export default function TriviaPage(){
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{ load() },[])

  async function load(){
    setLoading(true)
    setError(null)
    try{
      const res = await fetchTrivia(6)
      setQuestions(res.results || [])
    }catch(e){ setError(e.message || 'Erro') }
    finally{ setLoading(false) }
  }

  return (
    <div style={{ padding:24 }}>
      <h2>Open Trivia Demo</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color:'red' }}>{error}</div>}
      <div style={{ display:'grid', gap:12, marginTop:12 }}>
        {questions.map((q, index)=> <Question key={`${q.question}-${index}`} q={q} />)}
      </div>
    </div>
  )
}

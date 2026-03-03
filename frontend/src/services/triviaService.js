import axios from 'axios'

const BASE = 'https://opentdb.com'
const TOKEN_KEY = 'opentdb_token'

function getStoredToken(){
  try{ return localStorage.getItem(TOKEN_KEY) }catch(e){ return null }
}

async function requestNewToken(){
  const res = await axios.get(`${BASE}/api_token.php`, { params: { command: 'request' } })
  if(res?.data?.response_code === 0 && res.data.token){
    try{ localStorage.setItem(TOKEN_KEY, res.data.token) }catch(e){}
    return res.data.token
  }
  throw new Error('Não foi possível obter token do OpenTDB')
}

export async function fetchTrivia(amount = 10, category = '', difficulty = '') {
  let attempts = 0
  let lastErr

  while(attempts < 4){
    attempts++
    try{
      let token = getStoredToken()
      if(!token){
        token = await requestNewToken()
      }

      const params = { amount }
      if(category) params.category = category
      if(difficulty) params.difficulty = difficulty
      if(token) params.token = token

      const res = await axios.get(`${BASE}/api.php`, { params, timeout: 10000 })

      // response_code meanings: 0=Success,1=No Results,2=Invalid,3=Token Not Found,4=Token Empty
      const code = res?.data?.response_code
      if(code === 0){
        return res.data
      }

      if(code === 3 || code === 4){
        // token invalid or exhausted — obtain a new one and retry
        await requestNewToken()
        continue
      }

      // For no results, return the response so UI can show message
      if(code === 1) return res.data

      throw new Error('OpenTDB error code ' + code)
    }catch(err){
      lastErr = err
      const status = err?.response?.status
      // retry on 429 (rate limit) with backoff
      if(status === 429){
        const wait = 500 * attempts
        await new Promise(r => setTimeout(r, wait))
        continue
      }

      // network/timeouts — try a couple times
      if(attempts < 3){
        await new Promise(r => setTimeout(r, 200 * attempts))
        continue
      }

      throw err
    }
  }

  throw lastErr || new Error('Falha ao buscar trivia')
}

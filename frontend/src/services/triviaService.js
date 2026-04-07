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

function buildParams(amount, category, difficulty, token) {
  const params = { amount }
  if(category) params.category = category
  if(difficulty) params.difficulty = difficulty
  if(token) params.token = token
  return params
}

function handleResponseCode(code) {
  if(code === 0) return { success: true }
  if(code === 3 || code === 4) return { tokenError: true }
  if(code === 1) return { noResults: true }
  throw new Error('OpenTDB error code ' + code)
}

async function handleRetryError(err, attempts) {
  const status = err?.response?.status
  
  if(status === 429) {
    const wait = 500 * attempts
    await new Promise(r => setTimeout(r, wait))
    return true
  }
  
  if(attempts < 3) {
    await new Promise(r => setTimeout(r, 200 * attempts))
    return true
  }
  
  return false
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

      const params = buildParams(amount, category, difficulty, token)
      const res = await axios.get(`${BASE}/api.php`, { params, timeout: 10000 })
      const code = res?.data?.response_code
      
      const result = handleResponseCode(code)
      if(result.success) return res.data
      if(result.tokenError) {
        await requestNewToken()
        continue
      }
      if(result.noResults) return res.data
    }catch(err){
      lastErr = err
      const shouldRetry = await handleRetryError(err, attempts)
      if(shouldRetry) continue
      throw err
    }
  }

  throw lastErr || new Error('Falha ao buscar trivia')
}

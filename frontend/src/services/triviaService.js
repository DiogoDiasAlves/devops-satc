import axios from 'axios'

const BASE = 'https://opentdb.com'

export async function fetchTrivia(amount = 10, category = '', difficulty = '') {
  const params = { amount }
  if (category) params.category = category
  if (difficulty) params.difficulty = difficulty
  const res = await axios.get(`${BASE}/api.php`, { params })
  return res.data
}

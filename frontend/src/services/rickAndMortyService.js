import axios from 'axios'

const BASE = 'https://rickandmortyapi.com/api'

export async function fetchCharacters(page = 1) {
  const res = await axios.get(`${BASE}/character`, { params: { page } })
  return res.data
}

export async function searchCharacters(query) {
  const res = await axios.get(`${BASE}/character`, { params: { name: query } })
  return res.data
}

export async function fetchCharacterById(id) {
  const res = await axios.get(`${BASE}/character/${id}`)
  return res.data
}

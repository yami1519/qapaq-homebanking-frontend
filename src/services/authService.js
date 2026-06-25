import hbApi, { TOKEN_KEY, USER_KEY } from './hb_api.js'

/**
 * Login del CLIENTE (Banca por Internet de Financiera Qapaq).
 * Backend: POST /auth/login {username: dni, password}
 *   -> { access_token, token_type, expires_in_min, cliente: { codcliente, nombre, pkcliente, username } }
 * Devuelve { token, user } ya normalizado.
 */
export async function login(dni, password) {
  const { data } = await hbApi.post('/auth/login', { username: dni, password })
  const token = data.access_token
  const cliente = data.cliente || {}
  const user = {
    codcliente: cliente.codcliente ?? dni,
    nombre: cliente.nombre ?? dni,
    pkcliente: cliente.pkcliente,
    username: cliente.username ?? dni,
  }
  return { token, user }
}

export async function register(payload) {
  const { data } = await hbApi.post('/auth/register', payload)
  return data
}

export function saveSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getStoredToken() {
  const token = localStorage.getItem(TOKEN_KEY)
  if (!isUsableJwt(token)) {
    clearSession()
    return null
  }
  return token
}

export function getStoredUser() {
  if (!isUsableJwt(localStorage.getItem(TOKEN_KEY))) {
    clearSession()
    return null
  }
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function isUsableJwt(token) {
  if (!token || token.split('.').length !== 3) return false
  const payload = decodeJwtPayload(token)
  if (!payload) return false
  if (payload.exp && Date.now() >= payload.exp * 1000) return false
  return true
}

function decodeJwtPayload(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    return JSON.parse(window.atob(padded))
  } catch {
    return null
  }
}


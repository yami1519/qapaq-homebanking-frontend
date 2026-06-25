import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Fingerprint, Lock, LogIn, ArrowLeft, UserPlus } from 'lucide-react'
import { useHBAuth } from '../hooks/useHBAuth.js'
import { extractError } from '../utils/format.js'
import Alert from '../components/ui/Alert.jsx'
import Logo from '../components/ui/Logo.jsx'

export default function LoginPage() {
  const { login, isAuthenticated } = useHBAuth()
  const navigate = useNavigate()
  const [dni, setDni] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Si ya hay sesión, va directo a la banca.
  useEffect(() => {
    if (isAuthenticated) navigate('/inicio', { replace: true })
  }, [isAuthenticated, navigate])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!/^\d{8}$/.test(dni.trim())) {
      setError('Ingresa un DNI válido de 8 dígitos.')
      return
    }

    setLoading(true)
    try {
      await login(dni.trim(), password)
      navigate('/inicio', { replace: true })
    } catch (err) {
      setError(extractError(err, 'No se pudo iniciar sesión.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hb-login-bg">
      <div className="hb-login-card">
        <div className="hb-login-franja" />
        <div className="hb-login-head" style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <Logo size={48} variant="dark" subtitle="BANCA POR INTERNET" />
        </div>
        <p style={{ textAlign: 'center', color: 'var(--hb-muted)', fontSize: 13, margin: '0 0 22px' }}>
          Ingresa a tu Home Banking de Financiera Qapaq
        </p>

        <Alert tipo="error">{error}</Alert>

        <form onSubmit={onSubmit}>
          <div className="hb-field">
            <label htmlFor="dni">DNI</label>
            <div style={{ position: 'relative' }}>
              <Fingerprint size={18} style={iconStyle} />
              <input
                id="dni"
                className="hb-input"
                style={{ paddingLeft: 40 }}
                placeholder="8 dígitos"
                inputMode="numeric"
                maxLength={8}
                autoComplete="username"
                value={dni}
                onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
                autoFocus
                required
              />
            </div>
          </div>

          <div className="hb-field">
            <label htmlFor="password">Clave de Internet</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={iconStyle} />
              <input
                id="password"
                type="password"
                className="hb-input"
                style={{ paddingLeft: 40 }}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="hb-btn" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            <LogIn size={18} />
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 16, display: 'grid', gap: 10 }}>
          <Link to="/registro" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--hb-red)', fontSize: 13, fontWeight: 700 }}>
            <UserPlus size={15} /> Crear cuenta Qapaq
          </Link>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--hb-muted)', fontSize: 13 }}>
            <ArrowLeft size={15} /> Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

const iconStyle = {
  position: 'absolute',
  left: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9ca3af',
  pointerEvents: 'none',
}

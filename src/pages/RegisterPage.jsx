import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Fingerprint, Lock, Mail, Phone, UserPlus, Users } from 'lucide-react'
import * as authService from '../services/authService.js'
import { extractError } from '../utils/format.js'
import Alert from '../components/ui/Alert.jsx'
import Logo from '../components/ui/Logo.jsx'

const initialForm = {
  dni: '',
  nombres: '',
  apellidos: '',
  celular: '',
  correo: '',
  password: '',
  confirmPassword: '',
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)

  const setField = (key) => (e) => {
    const value = ['dni', 'celular'].includes(key) ? e.target.value.replace(/\D/g, '') : e.target.value
    setForm((f) => ({ ...f, [key]: value }))
  }

  const validate = () => {
    if (!/^\d{8}$/.test(form.dni)) return 'Ingresa un DNI válido de 8 dígitos.'
    if (form.nombres.trim().length < 2) return 'Ingresa tus nombres.'
    if (form.apellidos.trim().length < 2) return 'Ingresa tus apellidos.'
    if (!/^9\d{8}$/.test(form.celular)) return 'Ingresa un celular peruano válido de 9 dígitos.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) return 'Ingresa un correo válido.'
    if (form.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
    if (form.password !== form.confirmPassword) return 'Las contraseñas no coinciden.'
    return null
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const validation = validate()
    if (validation) {
      setError(validation)
      return
    }

    setLoading(true)
    try {
      await authService.register({
        dni: form.dni,
        nombres: form.nombres.trim(),
        apellidos: form.apellidos.trim(),
        celular: form.celular,
        correo: form.correo.trim(),
        password: form.password,
      })
      setSuccess('Cuenta creada correctamente. Ahora inicia sesión')
      window.setTimeout(() => navigate('/login'), 900)
    } catch (err) {
      const status = err?.response?.status
      const message = extractError(err, 'No se pudo crear la cuenta.')
      if (status === 404) {
        setError('No se encontró el servicio de registro en el servidor.')
      } else if (status === 400) {
        setError(message || 'Revisa los datos ingresados.')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hb-login-bg">
      <div className="hb-login-card hb-register-card">
        <div className="hb-login-franja" />
        <div className="hb-login-head" style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
          <Logo size={48} variant="dark" subtitle="CREA TU CUENTA" />
        </div>
        <p style={{ textAlign: 'center', color: 'var(--hb-muted)', fontSize: 13, margin: '0 0 22px' }}>
          Regístrate para acceder al Home Banking de Financiera Qapaq.
        </p>

        <Alert tipo="error">{error}</Alert>
        <Alert tipo="success">{success}</Alert>

        <form onSubmit={onSubmit}>
          <div className="hb-grid-2">
            <Field id="dni" label="DNI" icon={Fingerprint}>
              <input id="dni" className="hb-input" style={{ paddingLeft: 40 }} maxLength={8} inputMode="numeric" value={form.dni} onChange={setField('dni')} required />
            </Field>
            <Field id="celular" label="Celular" icon={Phone}>
              <input id="celular" className="hb-input" style={{ paddingLeft: 40 }} maxLength={9} inputMode="numeric" value={form.celular} onChange={setField('celular')} required />
            </Field>
          </div>

          <div className="hb-grid-2">
            <Field id="nombres" label="Nombres" icon={Users}>
              <input id="nombres" className="hb-input" style={{ paddingLeft: 40 }} value={form.nombres} onChange={setField('nombres')} required />
            </Field>
            <Field id="apellidos" label="Apellidos" icon={Users}>
              <input id="apellidos" className="hb-input" style={{ paddingLeft: 40 }} value={form.apellidos} onChange={setField('apellidos')} required />
            </Field>
          </div>

          <Field id="correo" label="Correo" icon={Mail}>
            <input id="correo" type="email" className="hb-input" style={{ paddingLeft: 40 }} value={form.correo} onChange={setField('correo')} required />
          </Field>

          <div className="hb-grid-2">
            <Field id="password" label="Contraseña" icon={Lock}>
              <input id="password" type="password" className="hb-input" style={{ paddingLeft: 40 }} value={form.password} onChange={setField('password')} required />
            </Field>
            <Field id="confirmPassword" label="Confirmar contraseña" icon={CheckCircle2}>
              <input id="confirmPassword" type="password" className="hb-input" style={{ paddingLeft: 40 }} value={form.confirmPassword} onChange={setField('confirmPassword')} required />
            </Field>
          </div>

          <button type="submit" className="hb-btn" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            <UserPlus size={18} />
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--hb-muted)', fontSize: 13 }}>
            <ArrowLeft size={15} /> Ya tengo acceso
          </Link>
        </div>
      </div>
    </div>
  )
}

function Field({ id, label, icon: Icon, children }) {
  return (
    <div className="hb-field">
      <label htmlFor={id}>{label}</label>
      <div style={{ position: 'relative' }}>
        <Icon size={18} style={iconStyle} />
        {children}
      </div>
    </div>
  )
}

const iconStyle = {
  position: 'absolute',
  left: 12,
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#6b7280',
  pointerEvents: 'none',
}

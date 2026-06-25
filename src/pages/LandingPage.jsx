import { useNavigate } from 'react-router-dom'
import {
  CreditCard, Wallet, PiggyBank, Send, Smartphone, ShieldCheck,
  TrendingUp, Clock, MapPin, ArrowRight, Lock, BadgePercent, Briefcase,
  UserPlus,
} from 'lucide-react'
import PublicHeader from '../components/layout/PublicHeader.jsx'
import PublicFooter from '../components/layout/PublicFooter.jsx'

const PRODUCTOS = [
  { icon: PiggyBank, color: '#111111', titulo: 'Cuenta de Ahorros Qapaq', desc: 'Ahorra en soles, consulta saldos y revisa tus movimientos desde canales digitales.' },
  { icon: Briefcase, color: '#ffcc00', titulo: 'Crédito para Negocio Qapaq', desc: 'Financiamiento para capital de trabajo, mercadería e impulso de actividades comerciales.' },
  { icon: Wallet, color: '#111111', titulo: 'Cuenta Negocios', desc: 'Cuenta asociada al flujo de tu negocio y al desembolso de créditos vigentes.' },
  { icon: BadgePercent, color: '#ffcc00', titulo: 'Depósito a Plazo Fijo', desc: 'Alternativa de ahorro para programar metas y mantener tus fondos ordenados.' },
  { icon: Send, color: '#111111', titulo: 'Transferencias', desc: 'Mueve dinero entre cuentas propias de manera rápida y con comprobante digital.' },
  { icon: CreditCard, color: '#ffcc00', titulo: 'Pago de crédito', desc: 'Consulta la próxima cuota y realiza pagos desde tu cuenta de ahorro.' },
]

const BENEFICIOS = [
  { icon: Smartphone, titulo: 'Canales digitales', desc: 'Opera tus cuentas y créditos desde una experiencia web simple y segura.' },
  { icon: ShieldCheck, titulo: 'Seguridad bancaria', desc: 'Estructura preparada para token JWT, sesiones protegidas y validaciones por cliente.' },
  { icon: Clock, titulo: 'Disponible 24/7', desc: 'Consulta saldos, cuotas, transferencias y pagos cuando lo necesites.' },
  { icon: MapPin, titulo: 'Enfoque peruano', desc: 'Productos orientados a ahorro, negocio y microfinanzas en Perú.' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="lp-page">
      <PublicHeader />

      {/* ===== HERO ===== */}
      <section className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-hero-text">
            <span className="lp-hero-tag">Home Banking · Financiera Qapaq</span>
            <h1>Financiera Qapaq</h1>
            <p>
              Gestiona tu Cuenta de Ahorros Qapaq, consulta tu Crédito para Negocio
              y realiza operaciones frecuentes desde una banca digital preparada para crecer.
            </p>
            <div className="lp-hero-actions">
              <button className="lp-btn lp-btn-light" onClick={() => navigate('/login')}>
                <Lock size={18} /> Ingresar al Home Banking
              </button>
              <button className="lp-btn lp-btn-dark" onClick={() => navigate('/registro')}>
                <UserPlus size={18} /> Crear cuenta
              </button>
              <a className="lp-btn lp-btn-outline" href="#productos">
                Conoce nuestros productos <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ACCESOS RÁPIDOS ===== */}
      <section className="lp-quickbar">
        <button className="lp-quick" onClick={() => navigate('/registro')}><Wallet size={20} /> Abrir cuenta</button>
        <button className="lp-quick" onClick={() => navigate('/login')}><BadgePercent size={20} /> Solicitar crédito</button>
        <button className="lp-quick" onClick={() => navigate('/login')}><Send size={20} /> Transferir</button>
        <button className="lp-quick" onClick={() => navigate('/login')}><CreditCard size={20} /> Pagar cuota</button>
      </section>

      {/* ===== PRODUCTOS ===== */}
      <section className="lp-section" id="productos">
        <div className="lp-section-head">
          <h2>Productos destacados</h2>
          <p>Ahorro y financiamiento para personas con negocio, conectados al backend del Home Banking.</p>
        </div>
        <div className="lp-products">
          {PRODUCTOS.map((p) => {
            const Icon = p.icon
            return (
              <article className="lp-product" key={p.titulo}>
                <span className="lp-product-icon" style={{ background: `${p.color}1a`, color: p.color }}>
                  <Icon size={26} />
                </span>
                <h3>{p.titulo}</h3>
                <p>{p.desc}</p>
                <button className="lp-product-link" onClick={() => navigate('/login')}>
                  Conócelo <ArrowRight size={15} />
                </button>
              </article>
            )
          })}
        </div>
      </section>

      {/* ===== PROMO ===== */}
      <section className="lp-promo">
        <div className="lp-promo-inner">
          <div>
            <span className="lp-promo-tag"><TrendingUp size={15} /> Producto Digital</span>
            <h2>Crédito para Negocio Qapaq</h2>
            <p>Solicita financiamiento para mercadería, insumos o capital de trabajo. La solicitud queda preparada para evaluación del core financiero.</p>
          </div>
          <button className="lp-btn lp-btn-light" onClick={() => navigate('/login')}>
            Solicitar ahora <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* ===== BENEFICIOS ===== */}
      <section className="lp-section" id="beneficios">
        <div className="lp-section-head">
          <h2>Beneficios Qapaq</h2>
          <p>Una experiencia bancaria enfocada en consulta, pago y seguimiento de productos financieros.</p>
        </div>
        <div className="lp-benefits">
          {BENEFICIOS.map((b) => {
            const Icon = b.icon
            return (
              <div className="lp-benefit" key={b.titulo}>
                <span className="lp-benefit-icon"><Icon size={24} /></span>
                <h3>{b.titulo}</h3>
                <p>{b.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

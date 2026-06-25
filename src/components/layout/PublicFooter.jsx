import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react'
import Logo from '../ui/Logo.jsx'

const COLS = [
  {
    title: 'Productos',
    links: ['Cuenta de Ahorros Qapaq', 'Cuenta Negocios', 'Crédito para Negocio Qapaq', 'Depósito a Plazo Fijo', 'Pago de créditos'],
  },
  {
    title: 'Financiera Qapaq',
    links: ['Conócenos', 'Trabaja con nosotros', 'Transparencia', 'Sostenibilidad', 'Agencias'],
  },
  {
    title: 'Ayuda',
    links: ['Centro de ayuda', 'Ubícanos', 'Reclamos', 'Transparencia', 'Tasas y tarifas'],
  },
]

export default function PublicFooter() {
  return (
    <footer className="lp-footer" id="footer">
      <div className="lp-footer-inner">
        <div className="lp-footer-brand">
          <Logo size={40} variant="light" subtitle="BANCA DIGITAL" />
          <p>Home Banking académico inspirado en Financiera Qapaq Perú, enfocado en ahorro y crédito para negocio.</p>
          <div className="lp-social">
            <a href="#footer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#footer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#footer" aria-label="Twitter"><Twitter size={18} /></a>
          </div>
        </div>

        {COLS.map((c) => (
          <div className="lp-footer-col" key={c.title}>
            <h4>{c.title}</h4>
            <ul>
              {c.links.map((l) => (
                <li key={l}><a href="#footer">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lp-footer-col">
          <h4>Contacto</h4>
          <ul className="lp-contact">
            <li><Phone size={15} /> Central de atención: (01) 712 3223</li>
            <li><Mail size={15} /> atencion@qapaq.pe</li>
            <li><MapPin size={15} /> Lima, Perú</li>
          </ul>
        </div>
      </div>

      <div className="hb-franja-top" />
      <div className="lp-footer-legal">
        © {2026} Financiera Qapaq — Home Banking. Demo educativo. Supervisado por la SBS.
      </div>
    </footer>
  )
}


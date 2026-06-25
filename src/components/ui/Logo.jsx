/**
 * Logo académico de Financiera Qapaq.
 * Isotipo: sello Q en amarillo, negro y blanco para mantener una identidad clara.
 *
 * @param {Object} props
 * @param {number}  [props.size=44]          Tamaño del isotipo en px.
 * @param {boolean} [props.wordmark=true]    Mostrar el texto "Financiera Qapaq".
 * @param {'dark'|'light'} [props.variant='dark'] Color del texto.
 * @param {string}  [props.subtitle='BANCA POR INTERNET] Texto secundario bajo el nombre.
 */

export default function Logo({
  size = 44,
  wordmark = true,
  variant = 'dark',
  subtitle = 'BANCA POR INTERNET',
}) {
  const textColor = variant === 'light' ? '#ffffff' : '#111111'
  const subColor = variant === 'light' ? 'rgba(255,255,255,.85)' : '#6b7280'
  const nameSize = Math.round(size * 0.5)
  const subSize = Math.max(9, Math.round(size * 0.23))

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Financiera Qapaq"
        role="img"
      >
        <rect x="4" y="4" width="40" height="40" rx="10" fill="#ffcc00" />
        <path
          d="M24 12c7 0 12 5 12 12 0 3.2-1.1 6-3 8.1l4.2 4.2-4 4-4.5-4.5A13 13 0 0 1 24 36c-7 0-12-5-12-12s5-12 12-12Zm0 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
          fill="#111111"
        />
        <circle cx="24" cy="24" r="3" fill="#ffffff" />
      </svg>

      {wordmark && (
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.04 }}>
          <span
            style={{
              fontWeight: 800,
              fontSize: nameSize,
              color: textColor,
              letterSpacing: 0,
            }}
          >
            Financiera Qapaq
          </span>
          {subtitle && (
            <span
              style={{
                fontSize: subSize,
                fontWeight: 700,
                color: subColor,
                letterSpacing: '1.2px',
              }}
            >
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  )
}

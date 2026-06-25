# Financiera Qapaq — Home Banking

Frontend académico de Home Banking para **Financiera Qapaq Perú**, construido sobre la arquitectura existente de React 18 + Vite.

## Stack

- React 18
- Vite 6
- React Router DOM
- Axios
- Recharts
- Lucide React

## Alcance funcional

- Landing pública con branding Qapaq, productos destacados y acceso al Home Banking.
- Registro de usuario con validaciones frontend.
- Login contra backend FastAPI con JWT.
- Dashboard con saludo, resumen financiero, accesos rápidos y últimos productos.
- Cuenta de Ahorros Qapaq con número de cuenta, saldo disponible, saldo contable y movimientos.
- Crédito para Negocio Qapaq con monto aprobado, saldo pendiente, próxima cuota, estado y cronograma.
- Operaciones: transferencias, movimientos, pago de servicios y pago de crédito.

## Productos representados

- Cuenta de Ahorros Qapaq
- Crédito para Negocio Qapaq

## Backend

La app requiere el backend FastAPI activo. Configurar:

```env
VITE_BASE_URL=http://localhost:8002
```

Las peticiones usan token Bearer JWT mediante la instancia central `src/services/hb_api.js`.

## Ejecutar

```bash
npm install
npm run dev
```

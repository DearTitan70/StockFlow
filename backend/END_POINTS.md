# StockFlow API - Documentacion de servicios web

Backend REST creado para la evidencia GA7-220501096-AA5-EV03. La API usa Node.js y Express, recibe y responde datos en formato JSON, aplica validaciones basicas y mantiene la informacion en memoria para facilitar la ejecucion local del proyecto.

## Ejecucion

```bash
cd backend
npm install
npm start
```

URL base:

```text
http://localhost:3000
```

Usuario inicial:

```json
{
  "username": "admin",
  "password": "admin123",
  "role": "jefe"
}
```

Para consumir rutas protegidas se debe enviar el token obtenido en login:

```text
Authorization: Bearer TOKEN
```

## Autenticacion

### POST /api/auth/register

Registra un usuario.

Campos: `username`, `password`, `name`, `email`, `role`.

Roles permitidos: `jefe`, `supervisor`, `tecnico`.

### POST /api/auth/login

Autentica un usuario y devuelve token.

Campos: `username`, `password`.

### GET /api/auth/me

Devuelve la informacion del usuario autenticado.

## Usuarios

### GET /api/users

Lista usuarios. Permitido para `jefe` y `supervisor`.

### POST /api/users

Crea usuario. Permitido para `jefe`.

### PUT /api/users/:id

Actualiza nombre, correo, rol o estado. Permitido para `jefe`.

### DELETE /api/users/:id

Desactiva usuario. Permitido para `jefe`.

## Productos e inventario

### GET /api/products

Lista productos. Acepta filtros opcionales: `status`, `category`, `search`.

### GET /api/products/:id

Consulta un producto por identificador.

### POST /api/products

Crea un producto.

Campos: `sku`, `name`, `category`, `quantity`, `minStock`, `status`, `location`.

Estados permitidos: `activo`, `en_reparacion`, `de_baja`.

### PUT /api/products/:id

Actualiza un producto completo.

### PATCH /api/products/:id/status

Actualiza solamente el estado del producto.

### DELETE /api/products/:id

Elimina un producto. Permitido para `jefe`.

## Movimientos de inventario

### GET /api/movements

Lista movimientos registrados. Permitido para `jefe` y `supervisor`.

### POST /api/movements

Registra entrada, salida o ajuste de inventario.

Campos: `productId`, `type`, `quantity`, `reason`.

Tipos permitidos: `entrada`, `salida`, `ajuste`.

Validaciones principales:

- No permite movimientos sobre productos inexistentes.
- No permite salidas mayores al stock disponible.
- La cantidad debe ser un entero mayor que cero.

## Reportes

### GET /api/reports/summary

Devuelve resumen general del inventario: productos, unidades, bajo stock, usuarios activos, movimientos y conteo por estado.

### GET /api/reports/low-stock

Lista productos cuya cantidad es menor o igual al stock minimo configurado.

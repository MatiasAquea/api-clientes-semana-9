# API Clientes - Semana 9

API REST desarrollada para la actividad de la semana 9 de **CIB302**.  
Este proyecto permite gestionar clientes mediante operaciones **CRUD** usando **Node.js**, **Express** y **PostgreSQL**.

## Descripción

La API fue diseñada para administrar la entidad `cliente` en una base de datos relacional, permitiendo:

- Listar todos los clientes
- Buscar un cliente por su ID
- Crear nuevos clientes
- Actualizar clientes existentes
- Eliminar clientes

Además, se aplican buenas prácticas básicas de desarrollo backend como:

- Uso de variables de entorno con `.env`
- Exclusión de archivos sensibles con `.gitignore`
- Consultas parametrizadas para reducir riesgo de inyección SQL
- Manejo de errores con códigos HTTP adecuados

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Postman
- Dotenv
- Git y GitHub

## Características principales

- API REST funcional
- CRUD completo para la tabla `cliente`
- Conexión a PostgreSQL mediante `pg`
- Pruebas realizadas con Postman
- Respuestas en formato JSON
- Estructura de proyecto modular
- Manejo de errores HTTP (`200`, `201`, `400`, `404`, `409`, `500`)

## Estructura del proyecto

```text
Proyecto Semana 9
├── .env
├── .gitignore
├── API Clientes - Semana 9.postman_collection.json
├── index.js
├── package-lock.json
├── package.json
├── README.md
├── database.sql
└── src
    ├── app.js
    ├── db.js
    ├── controllers
    │   └── clientes.controller.js
    └── routes
        └── clientes.routes.js
```

## Configuración de la base de datos

La tabla utilizada en PostgreSQL corresponde a la entidad `cliente` y contiene los siguientes campos:

- `idcliente`
- `nombre`
- `email`
- `telefono`
- `createdat`

Ejemplo de creación de tabla:

```sql
CREATE TABLE cliente (
  idcliente SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefono VARCHAR(50) NOT NULL,
  createdat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
## Script de base de datos

El archivo `database.sql` contiene la estructura de la tabla `cliente`.

Para utilizarlo:

1. Crear la base de datos `cib302_semana9` en PostgreSQL.
2. Abrir el archivo `database.sql` en pgAdmin.
3. Seleccionar la base de datos `cib302_semana9`.
4. Ejecutar el script.
5. Confirmar que la tabla `cliente` fue creada correctamente.
   
## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/MatiasAquea/api-clientes-semana-9.git
```

### 2. Entrar a la carpeta del proyecto

```bash
cd api-clientes-semana-9
```

### 3. Instalar dependencias

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con este formato:

```env
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=TU_PASSWORD
PG_DATABASE=cib302_semana9
PORT=3000
```

## Ejecución del proyecto

Para iniciar el servidor:

```bash
node index.js
```

Si todo está correcto, la API quedará ejecutándose en:

```text
http://localhost:3000
```

## Endpoints disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/clientes` | Lista todos los clientes |
| GET | `/clientes/:id` | Obtiene un cliente por ID |
| POST | `/clientes` | Crea un nuevo cliente |
| PUT | `/clientes/:id` | Actualiza un cliente existente |
| DELETE | `/clientes/:id` | Elimina un cliente |

## Ejemplo de body JSON

Para `POST` y `PUT` se puede usar un cuerpo como este:

```json
{
  "nombre": "Cliente Ejemplo",
  "email": "cliente@example.com",
  "telefono": "+56912345678"
}
```

## Códigos de respuesta HTTP

| Código | Significado |
|--------|-------------|
| 200 | Solicitud exitosa |
| 201 | Recurso creado correctamente |
| 400 | Datos incompletos o inválidos |
| 404 | Cliente no encontrado |
| 409 | Conflicto, por ejemplo email duplicado |
| 500 | Error interno del servidor |

## Pruebas en Postman

Las pruebas de la API fueron realizadas en Postman y se incluyen en la colección:

```text
API Clientes - Semana 9.postman_collection.json
```

La colección contiene solicitudes para:

- Listar clientes
- Buscar cliente por ID
- Crear cliente
- Actualizar cliente
- Eliminar cliente

## Seguridad aplicada

En este proyecto se aplicaron medidas básicas de seguridad y buenas prácticas:

- Variables sensibles separadas en `.env`
- Exclusión de `.env` y `node_modules` con `.gitignore`
- Consultas SQL parametrizadas
- Validación de campos obligatorios
- Manejo de errores y respuestas controladas

## Repositorio

Aquí se encuentra el código fuente del proyecto:

```text
https://github.com/MatiasAquea/api-clientes-semana-9.git
```


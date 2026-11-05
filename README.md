
# 🛒 Mercado Fresco — Sistema de Inventario y Carrito de Compras

Aplicación web desarrollada con React y Vite para la gestión de inventario de un supermercado, permitiendo registrar productos, consultar existencias, filtrar artículos por categoría y administrar un carrito de compras con actualización dinámica del stock.

Proyecto académico desarrollado para la asignatura **Desarrollo Frontend II (PFY2202)**.

## 📋 Descripción del proyecto

Mercado Fresco es una aplicación web orientada a la gestión de productos de un supermercado.

El sistema permite consultar un inventario de artículos, agregar nuevos productos y visualizar información detallada de cada uno. También incorpora un carrito de compras que permite seleccionar productos y modificar sus cantidades, manteniendo sincronizado el stock disponible.

La aplicación utiliza componentes reutilizables, navegación mediante React Router y administración de estado global con Context API y `useReducer`.

## 🚀 Tecnologías utilizadas

- **React:** desarrollo de interfaces mediante componentes.
- **Vite:** entorno de desarrollo y compilación.
- **JavaScript (ES6+):** lógica de la aplicación.
- **React Router DOM:** navegación entre páginas y rutas dinámicas.
- **Context API:** acceso compartido al estado global.
- **useReducer:** administración centralizada del inventario y carrito.
- **Material UI (MUI):** componentes visuales y formularios.
- **CSS3:** estilos personalizados y diseño responsive.
- **Git y GitHub:** control de versiones y alojamiento del repositorio.

## ✨ Funcionalidades

### 1. Página de inicio

- Presentación de Mercado Fresco.
- Visualización del inventario inicial.
- Indicadores dinámicos:
  - Total de productos registrados.
  - Total de unidades disponibles.
  - Cantidad de productos con stock bajo.
- Actualización automática de los indicadores al modificar el inventario.

### 2. Gestión del inventario

- Listado de productos en una tabla.
- Visualización de nombre, marca, tipo, categoría, precio y stock.
- Registro de nuevos artículos mediante formulario.
- Validación de campos obligatorios.
- Validación de precios y cantidades.
- Identificación visual de productos disponibles, con stock bajo y sin stock.

### 3. Filtros dinámicos

- Filtrado de productos por categoría.
- Generación automática de categorías a partir del inventario.
- Contador de resultados filtrados.
- Opción para visualizar todos los productos.
- Filtrado sin modificar el arreglo original de productos.

### 4. Detalle de productos

- Navegación mediante rutas dinámicas `/producto/:id`.
- Visualización de información individual del producto.
- Consulta del stock disponible.
- Selección de cantidad para agregar al carrito.
- Validación de cantidades:
  - Campo vacío.
  - Cantidades menores o iguales a cero.
  - Cantidades decimales.
  - Cantidades superiores al stock disponible.
- Mensajes de error específicos para cada situación.

### 5. Carrito de compras

- Incorporación de productos desde su página de detalle.
- Visualización de productos seleccionados.
- Aumento y disminución de cantidades.
- Eliminación de productos del carrito.
- Cálculo automático del subtotal por producto.
- Cálculo del total de la compra.
- Contador de unidades en el menú de navegación.

### 6. Sincronización del stock

El inventario y el carrito comparten un estado global administrado mediante Context API y `useReducer`.

Las operaciones permiten:

- Descontar stock al agregar productos al carrito.
- Descontar una unidad al aumentar la cantidad.
- Devolver una unidad al disminuir la cantidad.
- Restituir las unidades correspondientes al eliminar un producto.
- Evitar cantidades negativas o superiores al stock disponible.

Las actualizaciones se realizan mediante acciones centralizadas en el reducer, sin modificar directamente los arreglos originales.

### 7. Páginas informativas

**Quiénes somos**
- Presentación del supermercado.
- Información general del proyecto.

**Contacto**
- Formulario con campos controlados.
- Validación de campos obligatorios.
- Confirmación visual del envío simulado.

El formulario de contacto es demostrativo y no envía información a un servidor.

## 🏗️ Estructura del proyecto

```text
src/
├── assets/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── TablaInventario.jsx
├── context/
│   └── InventarioContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Inventario.jsx
│   ├── AgregarProducto.jsx
│   ├── DetalleProducto.jsx
│   ├── Carrito.jsx
│   ├── Nosotros.jsx
│   └── Contacto.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

### Organización de componentes

- **Navbar:** navegación principal y contador del carrito.
- **Footer:** información y enlaces de navegación.
- **TablaInventario:** componente reutilizable para mostrar productos.
- **InventarioContext:** estado global, reducer y operaciones del inventario y carrito.
- **Pages:** componentes correspondientes a las distintas vistas de la aplicación.
- **App:** definición de rutas y estructura principal.

Esta separación permite organizar las responsabilidades y facilita el mantenimiento del proyecto.

## 🧭 Rutas de navegación

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/inventario` | Listado y filtrado de productos |
| `/agregar-producto` | Formulario de registro de artículos |
| `/producto/:id` | Detalle individual del producto |
| `/carrito` | Administración del carrito |
| `/nosotros` | Información del supermercado |
| `/contacto` | Formulario de contacto |

## ⚙️ Instalación y ejecución

### Requisitos previos

- Node.js compatible con la versión de Vite utilizada.
- npm.
- Git (opcional, para clonar el repositorio).

### 1. Clonar el repositorio

```bash
git clone https://github.com/nebulosvs/supermercado-sofia-medina-PFY2202.git
```

### 2. Acceder a la carpeta del proyecto

```bash
cd supermercado-sofia-medina-PFY2202
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abrir en el navegador la dirección local indicada por Vite, normalmente:

```text
http://localhost:5173/
```

### 5. Generar la versión de producción

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`.

### 6. Previsualizar la compilación

```bash
npm run preview
```

## 🧪 Pruebas funcionales

Durante el desarrollo se realizaron pruebas manuales para verificar:

| Prueba | Resultado esperado |
|--------|--------------------|
| Registro de producto | El artículo aparece en el inventario |
| Filtro por categoría | Se muestran únicamente los productos correspondientes |
| Navegación al detalle | Se presenta la información del producto seleccionado |
| Agregar al carrito | Se registra la cantidad y se descuenta del inventario |
| Aumentar cantidad | Disminuye el stock disponible |
| Disminuir cantidad | Se restituye una unidad al inventario |
| Eliminar del carrito | Se restituyen las unidades reservadas |
| Cantidad cero o negativa | Se muestra un mensaje de validación |
| Cantidad decimal | Se rechaza la operación con un mensaje específico |
| Stock insuficiente | No se permite agregar más unidades de las disponibles |
| Carrito vacío | Se muestra un mensaje informativo |

## 📱 Diseño responsive

La interfaz utiliza CSS3 y componentes de Material UI para adaptarse a distintos tamaños de pantalla.

Se incorporaron:

- Distribución adaptable de tarjetas.
- Menú de navegación flexible.
- Formularios adaptables.
- Tablas con desplazamiento horizontal.
- Distribución responsive del carrito.
- Ajustes mediante media queries para tablets y dispositivos móviles.

## 💾 Persistencia de datos

Actualmente, los productos y el carrito se administran en memoria mediante Context API y `useReducer`.

Por lo tanto, los cambios realizados durante la sesión no se conservan al recargar la página.

La aplicación no utiliza una base de datos ni servicios backend, ya que su alcance corresponde al desarrollo frontend.

## 📚 Desarrollo por etapas

### Semana 1

- Configuración inicial del proyecto React con Vite.
- Implementación de navegación.
- Desarrollo de Home, Quiénes somos y Contacto.
- Visualización inicial de productos.
- Uso de componentes y estados locales.

### Semana 2

- Implementación de estado global.
- Creación del formulario para agregar productos.
- Desarrollo de la página de inventario.
- Incorporación de Material UI.

### Semana 3

- Implementación de filtros dinámicos.
- Desarrollo del detalle de productos.
- Implementación del carrito de compras.
- Sincronización de stock.
- Refactorización del estado global mediante `useReducer`.
- Separación de componentes reutilizables.
- Validaciones de cantidades y stock.

## 🔮 Posibles mejoras futuras

- Persistencia de datos mediante localStorage o una API.
- Edición y eliminación de productos del inventario.
- Búsqueda de productos por nombre.
- Historial de movimientos de stock.
- Autenticación de usuarios.
- Integración con una base de datos.
- Implementación de pruebas automatizadas.

## 📌 Consideraciones

Este proyecto fue desarrollado con fines académicos.

El carrito simula la selección y reserva de productos, pero no realiza compras ni procesa pagos reales.

## 👩‍💻 Autoría

Proyecto desarrollado individualmente para la asignatura **Desarrollo Frontend II (PFY2202)**.
```

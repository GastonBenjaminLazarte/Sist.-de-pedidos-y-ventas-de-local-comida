# COMANDA - Sistema de gestión de pedidos y ventas

## Integrantes

- Lazarte Gastón
- Lazarte Karina
- Gómez Gonzalo

La sección **Equipo y tecnologías** dentro del sitio también identifica a los tres integrantes y sus responsabilidades. El contador **Contributors** de GitHub se basa en los autores de los commits y puede mostrar menos personas que las declaradas en el equipo si todos los cambios fueron subidos desde una sola cuenta.

## Descripción

Comanda es un sistema web para centralizar pedidos y ventas de un local de comida, evitando depender de WhatsApp, llamadas, redes sociales y anotaciones manuales.

El proyecto permite gestionar:
- clientes que realizan pedidos sin iniciar sesión
- empleados que gestionan pedidos y estados
- repartidores que actualizan entregas
- administrador que controla productos, stock y ventas

## Funcionalidades principales

### Cliente
- visualización del menú con productos, precios, categorías y stock
- carrito con agregar, quitar, sumar y restar cantidades
- observaciones del pedido
- elección de retiro o domicilio
- datos del cliente para envío
- método de pago
- confirmación del pedido con número generado
- consulta de estado del pedido

### Empleado
- acceso con usuario y contraseña
- visualización de pedidos
- actualización de estados
- cancelación de pedidos

### Repartidor
- acceso con usuario y contraseña
- visualización de entregas de domicilio
- cambio de estado a En camino o Entregado

### Administrador
- dashboard con métricas resumidas
- gestión de productos
- edición, activación e inactivación
- control de stock
- vista de pedidos y ventas

## Tecnologías utilizadas

- HTML5
- CSS3
- Bootstrap 5.3.3
- JavaScript
- localStorage para persistencia de datos en el navegador

### Aplicación de Bootstrap

Bootstrap 5.3.3 se incorpora desde CDN en `html/index.html` y se utiliza en:

- grilla responsive con `container`, `row` y `col-*`
- navegación responsive con `navbar`, `navbar-toggler` y `collapse`
- botones, formularios, tarjetas, badges, alertas y tablas
- utilidades de espaciado, flexbox, colores y visibilidad como `d-flex`, `gap-*`, `p-*` y `d-none`

Los estilos propios de la identidad visual y los ajustes de componentes están en `css/bootstrap-overrides.css`.

## Estrategia SEO

La estrategia SEO de COMANDA busca posicionar el proyecto para personas que necesitan digitalizar los pedidos y las ventas de un local de comida.

### Objetivo y público

- atraer dueños y encargados de locales de comida
- comunicar que el sistema centraliza menú, carrito, pedidos, entregas, stock y ventas
- facilitar que el usuario entienda el producto desde la primera visita

### Palabras clave principales

- sistema de pedidos para local de comida
- sistema de ventas gastronómico
- menú online para restaurante
- gestión de pedidos y delivery
- control de stock para local de comida

### SEO técnico aplicado

- `lang="es"` para identificar el idioma principal
- título descriptivo y meta descripción orientada al contenido real del sitio
- metadatos Open Graph y Twitter Card para compartir el proyecto en redes sociales
- meta `robots` para permitir la indexación de la página pública
- estructura semántica con `header`, `nav`, `main`, `section` y `footer`
- encabezados jerárquicos (`h1`, `h2` y `h3`) y enlaces internos por sección
- diseño responsive mediante Bootstrap y estilos propios
- textos alternativos en las imágenes de productos
- contenido visible que explica el sistema, sus roles y sus funcionalidades

### SEO de contenidos y accesibilidad

La página utiliza términos relacionados con pedidos, ventas, clientes, repartidores, productos y stock de forma natural. Se priorizan textos claros, formularios con etiquetas, navegación por secciones y contraste visual para facilitar el uso en distintos dispositivos.

### Medición y mejora futura

En una publicación real se recomienda conectar Google Search Console y una herramienta de analítica, revisar las consultas de búsqueda, optimizar las páginas con peor rendimiento y agregar contenido útil sobre gestión gastronómica y pedidos online.

## Estructura del proyecto

```text
Sist. de pedidos y ventas local de comida/
├── html/
│   ├── index.html
│   └── panel.html
├── js/
│   ├── script.js
│   └── panel.js
├── css/
│   ├── bootstrap-overrides.css
│   └── style.css
├── img/
├── README.md
└── .gitignore
```

## Usuarios de prueba

- Empleado: empleado / 1234
- Repartidor: repartidor / 1234
- Administrador: admin / 1234

## Cómo probar el proyecto

1. Abrir `html/index.html` en el navegador.
2. Agregar productos al carrito.
3. Confirmar un pedido como cliente.
4. Consultar el estado por número de pedido.
5. Ingresar al panel desde `html/panel.html` y elegir el rol correspondiente.

## Estado del proyecto

El sistema está desarrollado como una versión funcional de frontend para TP, con lógica de negocio simulada y persistencia local para mantener datos entre recargas.

## Deploy

El proyecto quedó preparado para publicarse como sitio estático en Netlify o similar.

## Ramas y repositorio

El trabajo se desarrolló con Git y se subió a GitHub siguiendo una estructura de ramas para el proyecto.

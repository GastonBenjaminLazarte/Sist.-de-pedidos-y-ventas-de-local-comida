# Comanda - TP3: Refactorización con Bootstrap

## Integrantes

- Lazarte Gastón
- Lazarte Karina
- Gómez Gonzalo

## Descripción

Comanda es una interfaz web para gestionar pedidos y ventas de un local de comida. En este Trabajo Práctico N.º 3 se refactorizó la interfaz del TP2 utilizando Bootstrap, sin agregar funcionalidades nuevas.

La interfaz incluye navegación responsive, acceso de usuarios, roles, productos, stock, pedidos, ventas y pie de página.

## Tecnologías

- HTML5 semántico.
- Bootstrap 5.3.3 mediante CDN.
- CSS3.
- Git y GitHub.
- Netlify para deploy.

## Estructura

```text
mi-proyecto/
├── img/
├── index.html
├── style.css
├── bootstrap-overrides.css
└── README.md
```

## Refactorización con Bootstrap

- `navbar`, `navbar-expand-lg`, `collapse` y `navbar-toggler`: navegación responsive.
- `container`, `row`, `col`, `row-cols-*` y `g-*`: distribución adaptable.
- `card` y `shadow`: resumen, acceso y roles.
- `form-control` y `btn`: formulario de inicio de sesión.
- `table-responsive`, `table-hover` y `table-light`: tabla de productos.
- `list-group`: listado de pedidos.
- `badge`: estados de productos y pedidos.
- `py-*`, `p-*`, `gap-*`, `d-flex` y `flex-wrap`: espaciado y Flexbox.

## CSS anterior

El CSS puro realizado en el TP2 se conserva completo y comentado dentro de `style.css`; no fue eliminado. La hoja activa `bootstrap-overrides.css` contiene solamente ajustes visuales complementarios para la paleta de Comanda y convive con Bootstrap.

## Diseño responsive

Bootstrap adapta la navegación, las columnas y las cards mediante breakpoints. En pantallas pequeñas, el menú se contrae, los módulos pasan a una columna y la tabla permite desplazamiento horizontal. También se conserva una Media Query en `bootstrap-overrides.css` para ajustar el alto del hero, las sombras y el espaciado móvil.

## Ramas y flujo de trabajo

- `main`: versión estable.
- `dev`: rama de integración del equipo.
- `refactor/navbar`: rama de refactorización de la navegación.
- `refactor/home`: rama prevista para la sección principal.
- `refactor/footer`: rama prevista para el pie de página.

El trabajo se realiza en ramas `refactor/*`, luego se integran los cambios en `dev` mediante Pull Request. Finalmente, `dev` se integra en `main`.

## Deploy

El proyecto está preparado para publicarse en Netlify como sitio estático. En Netlify se debe seleccionar el repositorio de GitHub, usar `dev` o `main` como rama de producción y dejar vacío el comando de build. La URL pública se agrega aquí después de crear el sitio:

https://comanda-sist-pedidos-y-ventas-comida.netlify.app

## Ejecutar localmente

Abrir `index.html` en un navegador. Se necesita conexión a Internet para cargar Bootstrap desde el CDN.

# Comanda - Sistema de Gestión de Pedidos y Ventas

## Integrantes

- Lazarte Gastón
- Lazarte Karina
- Gómez Gonzalo

## Descripción

Comanda es una interfaz web para un sistema de gestión de pedidos y ventas de un local de comida. La propuesta centraliza el acceso de clientes, administradores, empleados y repartidores, además de organizar productos, stock, pedidos, entregas y ventas.

Esta entrega corresponde al Trabajo Práctico N.º 2: transforma la maqueta HTML inicial en una interfaz visual completa, adaptable a distintos tamaños de pantalla.

## Estructura

```text
mi-proyecto/
├── img/
├── style.css
├── index.html
└── README.md
```

## Tecnologías utilizadas

- HTML5 semántico.
- CSS3.
- Flexbox.
- CSS Grid.
- Variables CSS.
- Media Queries para Responsive Design.
- Git y GitHub.

## Aplicación de Flexbox

Se utilizó Flexbox en la barra de navegación, en los botones y acciones del encabezado, en los encabezados de sección, en las filas de pedidos y en el pie de página. Estas estructuras necesitan distribuir elementos en una misma dirección y alinearlos de manera flexible.

## Aplicación de Grid

Se utilizó CSS Grid en la sección principal, el resumen de actividad, los módulos de gestión, las tarjetas de roles, el formulario de acceso, las métricas, la tabla de productos y el gráfico de ventas. Grid permite organizar columnas y filas con unidades `fr` y adaptar la composición.

## Variables CSS

Las variables están declaradas en `:root` y se reutilizan con `var()`:

- `--tinta`: color principal del texto.
- `--verde`: color institucional y paneles destacados.
- `--menta`: fondo de secciones informativas.
- `--coral`: botones, enlaces y etiquetas.
- `--amarillo`: acentos y llamadas de atención.
- `--crema`: fondos suaves.
- `--gris`: textos secundarios.
- `--linea`: bordes y separadores.
- `--blanco`: fondos y textos claros.

## Responsive Design

El diseño utiliza una Media Query en `style.css` para pantallas de hasta `760px`. En celulares, las columnas pasan a una sola columna, el menú se reorganiza, las tarjetas se apilan, el formulario cambia a una columna y el contenido conserva márgenes, espaciados y legibilidad. La página utiliza además porcentajes, `rem`, `vw`, `vh`, `px` y unidades `fr` para mantener proporciones flexibles.

## Box Model y accesibilidad

Se aplica `box-sizing: border-box` globalmente, junto con `margin`, `padding`, `border` y sombras para construir los componentes. El HTML utiliza `header`, `nav`, `main`, `section`, `article`, `aside`, `form`, `table` y `footer`, además de etiquetas asociadas a sus campos.

## Ramas y commits

- `main`: versión estable e integración final.
- `dev`: rama principal de desarrollo.
- `feature/maquetado-html`: rama de trabajo inicial.

Los cambios del TP2 se desarrollan sobre `dev` con commits descriptivos y luego se integran a `main` mediante Pull Request en GitHub. El PR debe ser revisado y asignado a los compañeros del grupo.

## Flujo de trabajo del equipo

1. Crear una rama de trabajo a partir de `dev`.
2. Realizar cambios y commits descriptivos.
3. Publicar la rama y abrir un Pull Request hacia `dev` o `main`, según lo acordado por el equipo.
4. Revisar el código y asignar a los integrantes como colaboradores o revisores.

## Ejecutar

Abrir `index.html` en un navegador. Esta entrega es una interfaz estática y no requiere dependencias ni servidor.

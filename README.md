# COMANDA - Sistema de gestión de pedidos y ventas

## Integrantes

- Lazarte Gastón
- Lazarte Karina
- Gómez Gonzalo

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

## Estructura del proyecto

```text
Sist. de pedidos y ventas local de comida/
├── index.html
├── script.js
├── bootstrap-overrides.css
├── style.css
├── img/
├── README.md
└── .gitignore
```

## Usuarios de prueba

- Empleado: empleado / 1234
- Repartidor: repartidor / 1234
- Administrador: admin / 1234

## Cómo probar el proyecto

1. Abrir `index.html` en el navegador.
2. Agregar productos al carrito.
3. Confirmar un pedido como cliente.
4. Consultar el estado por número de pedido.
5. Ingresar con las credenciales de prueba para cada rol.

## Estado del proyecto

El sistema está desarrollado como una versión funcional de frontend para TP, con lógica de negocio simulada y persistencia local para mantener datos entre recargas.

## Deploy

El proyecto quedó preparado para publicarse como sitio estático en Netlify o similar.

## Ramas y repositorio

El trabajo se desarrolló con Git y se subió a GitHub siguiendo una estructura de ramas para el proyecto.

# Control de Rutas Escolar

Esta aplicación web permite gestionar el control de rutas escolares, registrando los traslados diarios de estudiantes y calculando los montos correspondientes.

## Características

- Login seguro para acceder a la aplicación
- Calendario interactivo para visualizar el estado de cada día
- Registro de transportes realizados por cada conductor
- Cálculo automático de totales diarios y mensuales
- Historial de totales mensuales
- Sistema de alarmas para horarios de salida y llegada
- Compartir informes de totales mensuales

## Tecnologías Utilizadas

- React.js para la interfaz de usuario
- Context API para el manejo de estado
- Tailwind CSS para los estilos
- Lucide React para los iconos

## Configuración del Proyecto

### Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. Clona este repositorio
2. Instala las dependencias con `npm install` o `yarn install`
3. Inicia la aplicación con `npm start` o `yarn start`

### Estructura del Proyecto

```
src/
├── components/     # Componentes de la UI
│   ├── calendar/   # Componentes relacionados con el calendario
│   ├── layout/     # Componentes de estructura
│   └── modals/     # Ventanas modales
├── context/        # Contextos de React para el estado global
├── hooks/          # Hooks personalizados
└── utils/          # Utilidades y funciones auxiliares
```

## Uso de la Aplicación

1. Inicia sesión con las credenciales proporcionadas (usuario: admin, contraseña: temporal123)
2. Visualiza el calendario y haz clic en un día para registrar información
3. Marca las casillas correspondientes a los traslados realizados
4. Opcionalmente, agrega valores adicionales
5. Consulta el historial de totales mensuales
6. Configura alarmas para recibir notificaciones

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

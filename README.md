# School Planner - Control de Ruta

Una aplicación React para el control y seguimiento de rutas escolares, completamente reorganizada sin dependencias de Firebase.

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── AlarmsModal.js      # Modal para configurar alarmas
│   ├── Calendar.js         # Componente del calendario
│   ├── CalendarioControlRuta.js  # Componente principal
│   ├── DayModal.js         # Modal para ingresar datos del día
│   ├── Header.js           # Encabezado de la aplicación
│   ├── HistoryModal.js     # Modal del historial mensual
│   └── LoginForm.js        # Formulario de inicio de sesión
├── hooks/               # Custom hooks de React
│   ├── useAlarms.js        # Hook para manejo de alarmas
│   ├── useAuth.js          # Hook para autenticación
│   ├── useCalendarData.js  # Hook para datos del calendario
│   └── useClock.js         # Hook para reloj en tiempo real
├── services/            # Servicios de la aplicación
│   └── shareService.js     # Servicio para compartir informes
└── utils/               # Utilidades y helpers
    ├── constants.js        # Constantes de la aplicación
    ├── dateUtils.js        # Utilidades para fechas
    └── storage.js          # Utilidades para localStorage
```

## 🚀 Características

- **Sin Firebase**: Completamente independiente, usa localStorage para persistencia
- **Autenticación Simple**: Sistema de login básico
- **Control de Rutas**: Seguimiento de llevadas y traídas para dos personas
- **Alarmas**: Notificaciones configurables para horarios de salida y llegada
- **Historial**: Registro mensual de totales
- **Compartir**: Funcionalidad para compartir informes mensuales
- **Responsivo**: Diseño adaptable a diferentes tamaños de pantalla

## 📦 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar la aplicación:
```bash
npm start
```

## 🔧 Configuración

### Credenciales de Acceso
- **Usuario**: admin
- **Contraseña**: temporal123

### Valores por Defecto
- Samuel Mathias: $3,000 (llevada y traída)
- Martín Santiago: $2,500 (llevada y traída)

## 💾 Almacenamiento de Datos

La aplicación utiliza localStorage del navegador para guardar:
- Datos diarios del calendario
- Totales mensuales
- Configuración de alarmas
- Estado de sesión

## 🎯 Uso

1. **Iniciar Sesión**: Usar las credenciales configuradas
2. **Seleccionar Día**: Hacer clic en cualquier día del calendario
3. **Registrar Datos**: Marcar las casillas correspondientes y agregar valores adicionales
4. **Configurar Alarmas**: Usar el botón de campana para configurar notificaciones
5. **Ver Historial**: Usar el botón de lista para ver totales mensuales
6. **Compartir**: Generar y compartir informes desde el historial

## 🔔 Notificaciones

Para recibir alarmas, es necesario:
1. Permitir notificaciones en el navegador
2. Configurar horarios en el modal de alarmas
3. Mantener la aplicación abierta en el navegador

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework principal
- **Lucide React**: Iconos
- **Tailwind CSS**: Estilos (vía CDN)
- **localStorage**: Persistencia de datos
- **Web Notifications API**: Sistema de alarmas

## 📋 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm eject`: Expone la configuración de Create React App

## 🎨 Personalización

### Modificar Valores Fijos
Editar `src/utils/constants.js`:
```javascript
export const VALORES_FIJOS = {
  samuel: { llevada: 3000, traida: 3000 },
  martin: { llevada: 2500, traida: 2500 }
};
```

### Cambiar Credenciales
Editar `src/utils/constants.js`:
```javascript
export const CREDENTIALS = {
  USERNAME_ENCODED: btoa('nuevo_usuario'),
  PASSWORD_ENCODED: btoa('nueva_contraseña')
};
```

## 🚨 Consideraciones de Seguridad

- Las credenciales están ofuscadas con Base64 (NO es seguro para producción)
- Para uso en producción, implementar autenticación real con backend
- Los datos se almacenan localmente en el navegador

## 📱 Compatibilidad

- Navegadores modernos con soporte para:
  - ES6+
  - localStorage
  - Web Notifications API
  - CSS Grid y Flexbox

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la nueva característica
3. Hacer commit de los cambios
4. Push a la rama
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y personales.

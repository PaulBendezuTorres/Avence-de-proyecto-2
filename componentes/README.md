# Sistema de Componentes Reutilizables

## 📁 Estructura

```
componentes/
├── header.html    # Componente del encabezado
└── footer.html    # Componente del pie de página
components.js      # Sistema de carga de componentes
```

## 🚀 Cómo Usar

### 1. En cada página HTML

Reemplaza el header y footer con contenedores:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- tus metas y links aquí -->
</head>
<body>
  
  <!-- Header Component Container -->
  <div id="header-container"></div>

  <main>
    <!-- Tu contenido aquí -->
  </main>

  <!-- Footer Component Container -->
  <div id="footer-container"></div>

  <!-- Components System -->
  <script src="components.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

### 2. Modificar Header o Footer

**¡Ahora solo necesitas modificar un archivo!**

- Para cambiar el header: Edita `componentes/header.html`
- Para cambiar el footer: Edita `componentes/footer.html`

Los cambios se aplicarán automáticamente a **todas las páginas** que usen el sistema.

## ✅ Ventajas

1. **Sin duplicación**: Modifica header/footer en un solo lugar
2. **Menos errores**: No hay que actualizar múltiples archivos
3. **Fácil mantenimiento**: Cambios rápidos y consistentes
4. **Escalable**: Puedes agregar más componentes fácilmente

## 📝 Páginas que Necesitan Actualizar

Actualiza estos archivos para usar el sistema de componentes:

- [ ] index.html ✅ (Ya actualizado)
- [ ] menu.html
- [ ] contacto.html
- [ ] reservas.html

## ⚠️ Importante

Este sistema requiere que el sitio se ejecute desde un servidor web (no funcionará con `file:///`). 

**Opciones para desarrollo local:**

1. **Live Server** (VS Code Extension) - Recomendado
2. **Python**: `python -m http.server 8000`
3. **Node.js**: `npx http-server`
4. **PHP**: `php -S localhost:8000`

## 🔧 Agregar Más Componentes

1. Crea el archivo HTML en `componentes/`
2. En `components.js`, agrega la carga:

```javascript
loadComponent('tu-componente', '#tu-contenedor');
```

3. En tus páginas, agrega el contenedor:

```html
<div id="tu-contenedor"></div>
```

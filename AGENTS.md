# CodexBall

- Stack: Vite, HTML5, JavaScript Vanilla con ES Modules y Tailwind CSS v4 mediante el plugin de Vite.
- Diseñar primero para móvil; conservar navegación por teclado, etiquetas accesibles y contraste legible.
- `src/components/`: componentes de interfaz reutilizables. `src/pages/`: vistas. `src/data/`: contenido. `src/styles/`: estilos.
- Usar rutas por hash para que los enlaces directos funcionen en GitHub Pages sin servidor de rutas. Mantener `base: './'` y recursos locales relativos.
- No añadir frameworks, backend, base de datos ni estadísticas deportivas sin fuentes verificables.
- Mantener las funciones avanzadas como pantallas provisionales claramente identificadas.
- Ejecutar `npm test` y `npm run build` después de cambios funcionales.
- El workflow de Pages construye y publica `dist/`. Configurar GitHub Pages con origen GitHub Actions.

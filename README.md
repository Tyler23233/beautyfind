# BeautyFind

This repository contains the BeautyFind prototype. It now uses [Vite](https://vitejs.dev/) for bundling and ES module support.

## Module Structure
- `assets/js/auth/` – authentication utilities (`AuthManager`).
- `assets/js/products/` – product catalogue logic (`ProductManager`).
- `assets/js/ui/` – UI helpers such as dynamic component loading.
- `templates/` – HTML fragments loaded at runtime (navigation, hero, filters).
- `assets/js/main.js` – application entry point that wires modules and injects templates.

## Development
```bash
npm install
npm run dev      # start dev server
npm run build    # production build
```

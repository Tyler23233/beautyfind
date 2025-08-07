import AuthManager from './auth/AuthManager.js';
import ProductManager from './products/manager.js';
import { loadComponent } from './ui/components.js';

loadComponent('nav', 'nav.html');
loadComponent('hero', 'hero.html');
loadComponent('filters', 'filters.html');

export const auth = new AuthManager();
export const products = new ProductManager();

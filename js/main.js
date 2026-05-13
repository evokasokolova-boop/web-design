import { initCatalog } from './modules/catalog.js';
import { initProductCard } from './modules/product-card.js';
import { initSlider } from './modules/slider.js';

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('catalog.html')) {
        initCatalog();
    } else if (path.includes('product-card.html')) {
        initProductCard();
    } else if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        initSlider();
    }
});

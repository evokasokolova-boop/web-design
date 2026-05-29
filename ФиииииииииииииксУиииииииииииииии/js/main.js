import { initCatalog } from './modules/catalog.js';
import { initProductCard } from './modules/product-card.js';
import { initSlider } from './modules/slider.js';
import { initHeader } from './modules/header.js';

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    
    const path = window.location.pathname;

    if (path.includes('catalog.html')) {
        initCatalog();
    } else if (path.includes('product-card.html')) {
        initProductCard();
    } else if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        initSlider();
    }

    document.addEventListener('click', (e) => {
        const likeBtn = e.target.closest('.catalog__item-like');
        const basketBtn = e.target.closest('.catalog__item-busket');
        
        if (likeBtn) {
            e.preventDefault();
            e.stopPropagation();
            likeBtn.classList.toggle('active');
        }
        
        if (basketBtn) {
            e.preventDefault();
            e.stopPropagation();
            basketBtn.classList.toggle('active');
        }
    });
});

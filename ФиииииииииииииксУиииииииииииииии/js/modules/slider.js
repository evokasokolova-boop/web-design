class Slider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        this.prevBtn = this.container.querySelector('.slider-btn-prev');
        this.nextBtn = this.container.querySelector('.slider-btn-next');
        this.viewport = this.container.querySelector('.slider-viewport');

        this.items = [];

        this.currentIndex = 0;
        this.itemsVisible = 2;

        this.init();
    }

    async init() {
        if (!this.prevBtn || !this.nextBtn || !this.viewport) return;
        
        try {
            const response = await fetch('catalog.html');
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            
            const allItems = doc.querySelectorAll('.catalog__item');
            allItems.forEach((item, index) => {
                item.dataset.id = index + 1;
                item.style.cursor = 'pointer';
            });
            
            const diffusersContainer = doc.querySelector('#scented-candles')?.closest('.catalog__wrapper-el');
            if (!diffusersContainer) return;
            
            const catalogItems = diffusersContainer.querySelectorAll('.catalog__item');
            
            catalogItems.forEach(item => {
                this.items.push(item.outerHTML);
            });
        } catch (e) {
            console.error('Failed to load catalog items for slider', e);
        }

        if (this.items.length === 0) return;

        this.renderSlider();
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        this.container.addEventListener('click', (e) => {
            const item = e.target.closest('.catalog__item');
            if (item && item.dataset.id && !e.target.closest('svg')) {
                window.location.href = `product-card.html?id=${item.dataset.id}`;
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
        this.renderSlider();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
        this.renderSlider();
    }

    renderSlider() {
        const track = this.viewport.querySelector('.slider-track');
        if (!track) return;
        track.style.transition = 'none';

        let html = '';
        for (let i = 0; i < this.itemsVisible; i++) {
            const index = (this.currentIndex + i) % this.items.length;
            html += this.items[index];
        }

        track.innerHTML = html;

        setTimeout(() => {
            track.style.transition = 'transform 0.5s ease';
        }, 0);
    }
}

export function initSlider() {
    new Slider('.slider');
}

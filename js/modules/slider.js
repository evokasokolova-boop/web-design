class Slider {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        this.prevBtn = this.container.querySelector('.slider-btn-prev');
        this.nextBtn = this.container.querySelector('.slider-btn-next');
        this.viewport = this.container.querySelector('.slider-viewport');

        this.images = [
            'assets/img/index-6.png',
            'assets/img/index-7.png',
            'assets/img/index-8.png',
            'assets/img/index-9.png',
            'assets/img/index-10.png'
        ];

        this.currentIndex = 0;
        this.itemsVisible = 2;

        this.init();
    }

    init() {
        if (!this.prevBtn || !this.nextBtn || !this.viewport) return;
        this.renderSlider();
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.renderSlider();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.renderSlider();
    }

    renderSlider() {
        const track = this.viewport.querySelector('.slider-track');
        if (!track) return;
        track.style.transition = 'none';

        let html = '';
        for (let i = 0; i < this.images.length; i++) {
            const index = (this.currentIndex + i) % this.images.length;
            html += `<img src="${this.images[index]}" alt="" class="slider-img">`;
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

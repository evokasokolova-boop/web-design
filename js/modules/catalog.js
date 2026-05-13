export function initCatalog() {
    document.querySelectorAll('.catalog__item').forEach((item, index) => {
        item.dataset.id = index + 1;
        item.style.cursor = 'pointer';
    });

    document.querySelector('.catalog')?.addEventListener('click', (e) => {
        const item = e.target.closest('.catalog__item');
        if (item && item.dataset.id && !e.target.closest('svg')) {
            window.location.href = `product-card.html?id=${item.dataset.id}`;
        }
    });

    document.querySelectorAll('.catalog__btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const containerEl = btn.closest('.catalog__wrapper-el');
            const list = containerEl ? containerEl.querySelector('.catalog__list') : null;

            if (list) {
                const clone = list.cloneNode(true);
                btn.parentNode.insertBefore(clone, btn);
            }
        });
    });
}

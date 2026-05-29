import { catalogProducts } from './products-data.js';

export function initProductCard() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    const product = catalogProducts.find(p => p.id === productId);

    if (!product) {
        document.body.innerHTML = '<div class="container" style="padding: 100px 20px; text-align: center; font-family: Arial, sans-serif;"><h2>Товар не найден</h2><a href="catalog.html" style="color: var(--color-olive-muted); text-decoration: underline;">Вернуться в каталог</a></div>';
        return;
    }

    const categoryEl = document.querySelector('.product-card__category');
    if (categoryEl) categoryEl.textContent = product.category;

    const nameEl = document.querySelector('.product-card__name');
    if (nameEl) nameEl.textContent = product.name;

    const featuresEl = document.querySelector('.product-card__features');
    if (featuresEl) featuresEl.textContent = product.features;

    const priceEl = document.querySelector('.product-card__price');
    if (priceEl) priceEl.textContent = product.price;



    function getImagePath(img) {
        if (!img) return '';
        return img;
    }

    const mainImgEl = document.querySelector('.product-card__img');
    if (mainImgEl && product.images && product.images.length > 0) {
        mainImgEl.src = getImagePath(product.images[0]);
    }

    const smallImgs = document.querySelectorAll('.product-card__small-img');
    const dotsContainer = document.querySelector('.product-card__dots');
    
    function setActiveDot(index) {
        if (!dotsContainer) return;
        dotsContainer.querySelectorAll('.product-card__dot').forEach((dot, i) => {
            dot.classList.toggle('product-card__dot--active', i === index);
        });
    }

    if (product.images) {
        if (smallImgs.length > 0) {
            smallImgs.forEach(img => img.style.display = 'none');
        }
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
        }

        const imagesToShow = product.images;

        const smallImagesContainer = document.querySelector('.product-card__small-images');
        if (smallImagesContainer) {
            if (imagesToShow.length <= 1) {
                smallImagesContainer.style.display = 'none';
            } else {
                smallImagesContainer.style.display = '';
            }
        }

        imagesToShow.forEach((img, idx) => {
            
            if (smallImgs && smallImgs[idx]) {
                smallImgs[idx].src = getImagePath(img);
                smallImgs[idx].style.display = 'inline-block';
                smallImgs[idx].style.cursor = 'pointer';
                smallImgs[idx].addEventListener('click', () => {
                    if (mainImgEl) mainImgEl.src = getImagePath(img);
                    setActiveDot(idx);
                });
            }

            
            if (dotsContainer && imagesToShow.length > 1) {
                const dot = document.createElement('button');
                dot.classList.add('product-card__dot');
                if (idx === 0) dot.classList.add('product-card__dot--active');
                dot.addEventListener('click', () => {
                    if (mainImgEl) mainImgEl.src = getImagePath(img);
                    setActiveDot(idx);
                });
                dotsContainer.appendChild(dot);
            }
        });
    }

    document.querySelectorAll('.product-tabs__product-name').forEach(el => {
        el.textContent = product.name;
    });

    const descText = document.getElementById('descriptionText');
    if (descText) descText.textContent = product.description || 'Описание отсутствует.';

    const usageText = document.getElementById('usageText');
    if (usageText) usageText.textContent = product.usage || 'Инструкция по применению отсутствует.';

    const compText = document.getElementById('compositionText');
    if (compText) compText.textContent = product.composition || 'Информация о составе отсутствует.';

    const brandText = document.getElementById('brandText');
    if (brandText) brandText.textContent = product.brand || 'Информация о бренде отсутствует.';

    const productSpecsData = {
        1: { type: 'Диффузор', group: 'Древесные, сладкие', top: 'давана', middle: 'ваниль', base: 'амбервуд', weight: '85 мл' },
        2: { type: 'Свеча ароматическая', group: 'Свежие, хлопковые', top: 'альдегиды', middle: 'хлопок', base: 'мускус', weight: '220 г' },
        3: { type: 'Диффузор', group: 'Цветочные', top: 'зеленые ноты', middle: 'жасмин', base: 'мускус', weight: '100 мл' },
        4: { type: 'Диффузор', group: 'Цветочные, фруктовые', top: 'грейпфрут', middle: 'роза', base: 'пачули', weight: '100 мл' },
        5: { type: 'Ароматизатор воздуха', group: 'Фруктовые', top: 'красные ягоды', middle: 'виноград', base: 'древесные ноты', weight: '250 мл' },
        6: { type: 'Спрей для дома', group: 'Свежие', top: 'цитрус', middle: 'водные ноты', base: 'белый мускус', weight: '150 мл' },
        7: { type: 'Спрей для дома', group: 'Цветочные', top: 'зеленый чай', middle: 'пион', base: 'кедр', weight: '100 мл' },
        8: { type: 'Спрей для дома', group: 'Цветочные', top: 'орхидея', middle: 'ванда', base: 'амбра', weight: '100 мл' },
        9: { type: 'Свеча ароматическая', group: 'Мускусные', top: 'имбирь', middle: 'мускус', base: 'сандал', weight: '270 г' },
        10: { type: 'Свеча ароматическая', group: 'Свежие', top: 'альдегиды', middle: 'хлопок', base: 'мускус', weight: '220 г' },
        11: { type: 'Свеча ароматическая', group: 'Цветочные', top: 'бергамот', middle: 'роза', base: 'амбра', weight: '250 г' },
        12: { type: 'Свеча ароматическая', group: 'Пряные, табачные', top: 'роза, личи, грейпфрут', middle: 'кедр, мускус', base: 'ваниль', weight: '270 г' },
        13: { type: 'Благовония', group: 'Восточные', top: 'лаванда', middle: 'мирра', base: 'ладан', weight: '20 шт' },
        14: { type: 'Благовония', group: 'Древесные', top: 'кедр', middle: 'пало санто', base: 'сандал', weight: '15 шт' },
        15: { type: 'Благовония', group: 'Древесные', top: 'пало santo', middle: 'кедр', base: 'мускус', weight: '10 шт' },
        16: { type: 'Благовония', group: 'Пряные, восточные', top: 'черный опиум', middle: 'специи', base: 'сандал', weight: '15 шт' }
    };

    const specs = productSpecsData[productId] || {
        type: product.category || 'ароматический продукт',
        group: 'уточняется',
        top: product.features || 'уточняется',
        middle: 'уточняется',
        base: 'уточняется',
        weight: 'уточняется'
    };

    const specTypeEl = document.getElementById('specType');
    if (specTypeEl) specTypeEl.textContent = specs.type;

    const specGroupEl = document.getElementById('specGroup');
    if (specGroupEl) specGroupEl.textContent = specs.group;

    const specTopNotesEl = document.getElementById('specTopNotes');
    if (specTopNotesEl) specTopNotesEl.textContent = specs.top;

    const specMiddleNotesEl = document.getElementById('specMiddleNotes');
    if (specMiddleNotesEl) specMiddleNotesEl.textContent = specs.middle;

    const specBaseNotesEl = document.getElementById('specBaseNotes');
    if (specBaseNotesEl) specBaseNotesEl.textContent = specs.base;

    const specWeightEl = document.getElementById('specWeight');
    if (specWeightEl) specWeightEl.textContent = specs.weight;

    document.querySelectorAll('.product-tabs__btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            document.querySelectorAll('.product-tabs__btn').forEach(b => b.classList.remove('product-tabs__btn--active'));
            document.querySelectorAll('.product-tabs__pane').forEach(pane => pane.classList.remove('product-tabs__pane--active'));

            btn.classList.add('product-tabs__btn--active');
            const pane = document.getElementById(tabName);
            if (pane) pane.classList.add('product-tabs__pane--active');
        });
    });

    const similarListEl = document.getElementById('similarList');
    if (similarListEl) {
        const similarProducts = catalogProducts.filter(p => p.id !== productId).slice(0, 4);
        let similarHTML = '';

        similarProducts.forEach(p => {
            const imgPath = getImagePath(p.images[0]);
            similarHTML += `
                <li class="catalog__item" style="cursor: pointer;" onclick="window.location.href='product-card.html?id=${p.id}'">
                    <div class="catalog__item-media">
                        <img src="${imgPath}" alt="${p.name}" class="catalog__item-img">
                        <svg class="catalog__item-busket" width="35" height="35">
                            <use xlink:href="assets/sprite/sprite.svg#busket-icon"></use>
                        </svg>
                        <svg class="catalog__item-like" width="20" height="19">
                            <use xlink:href="assets/sprite/sprite.svg#like-icon"></use>
                        </svg>
                    </div>
                    <div class="catalog__item-inner">
                        <p class="catalog__item-category">${p.category}</p>
                        <p class="catalog__item-name">${p.name}</p>
                        <p class="catalog__item-features">${p.features}</p>
                        <p class="catalog__item-price">${p.price}</p>
                    </div>
                </li>
            `;
        });

        similarListEl.innerHTML = similarHTML;
    }

    const favBtn = document.querySelector('.product-card__btn-favorite');
    if (favBtn) {
        favBtn.addEventListener('click', () => {
            favBtn.classList.toggle('is-active');
            if (favBtn.classList.contains('is-active')) {
                alert('Товар добавлен в избранное');
            } else {
                alert('Товар убран из избранного');
            }
        });
    }
}

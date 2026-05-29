export function initHeader() {
    const burgerBtn = document.querySelector('.header_burger-btn');
    const headerList = document.querySelector('.header_list');

    if (burgerBtn && headerList) {
        burgerBtn.addEventListener('click', () => {
            headerList.classList.toggle('header_list--open');
            burgerBtn.classList.toggle('header_burger-btn--open');
        });
    }
}

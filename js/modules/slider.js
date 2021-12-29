function slider() {
    ////slider

    const prevBtn = document.querySelector('.offer__slider-next');
    const nextBtn = document.querySelector('.offer__slider-prev');
    const slides = document.querySelectorAll('.offer__slide');
    const slidesImg = document.querySelectorAll('.offer__slide img');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const sliderInner = document.querySelector('.offer__slider-inner');
    const width = window.getComputedStyle(sliderInner).width;
    let offset = 0;
    let idx = 1;

    let currentNumber = document.querySelector('#current');

    function showImgNumber() {
        if (idx > slides.length) {
            idx = 1;
        } else if (idx < 1) {
            idx = slides.length;
        }
        currentNumber.textContent = '0' + idx;
    }

    showImgNumber();

    sliderInner.style.display = 'flex';

    slidesImg.forEach(slide => slide.style.width = width);
    slidesWrapper.style.overflow = 'hidden';

    function getWidth(sliderWidth) {
        return +sliderWidth.slice(0, sliderWidth.length - 2)
    }

    nextBtn.addEventListener('click', () => {
        if (offset == getWidth(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getWidth(width)
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        idx--;
        showImgNumber();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[idx - 1].style.opacity = 1;
    });

    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = getWidth(width) * (slides.length - 1);
        } else {
            offset -= getWidth(width);
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        idx++;
        showImgNumber(idx);

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[idx - 1].style.opacity = 1;
    });

    ////navigation for the slider
    const slider = document.querySelector('.offer__slider');
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = ` position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;`;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            idx = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            sliderInner.style.transform = `translateX(-${offset}px)`;

            showImgNumber();

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[idx - 1].style.opacity = 1;
        })
    })
}

module.exports = slider;
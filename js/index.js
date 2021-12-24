const tabsParent = document.querySelector('.tabheader__items'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabs = document.querySelectorAll('.tabheader__item');

function hideContent() {
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    })
}

function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideContent();
showTabContent();

tabsParent.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideContent();
                showTabContent(i);
            }
        })
    }
})


//Time

const deadline = '2022-03-03';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor(t / (1000 * 60 * 60) % 24),
        minutes = Math.floor((t / 1000 / 60) % 24),
        seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
    };
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function zeroToNumber(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = zeroToNumber(t.days);
        hours.innerHTML = zeroToNumber(t.hours);
        minutes.innerHTML = zeroToNumber(t.minutes);
        seconds.innerHTML = zeroToNumber(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setClock('.time', deadline);

///Modal

const modalTrigger = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
//const modalClose = document.querySelector('.modal__close');

function openModal() {
    modal.style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden'
    console.log(modal);
    clearInterval(openModalInTime);
}

modalTrigger.forEach(el => {
    el.addEventListener('click', (e) => {
        openModal();
    })
});

function closemodalWindow() {
    modal.style.display = 'none';
    document.querySelector('body').style.overflow = '';
}

//modalClose.addEventListener('click', closemodalWindow);

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.className === 'modal__close') {
        closemodalWindow();
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closemodalWindow();
    }
})

const openModalInTime = setTimeout(openModal, 3000);

function showModalByScroll() {
    if (document.documentElement.clientHeight + window.pageYOffset
        >= document.documentElement.scrollHeight) {
        openModal();
        document.removeEventListener('scroll', showModalByScroll);
    }
}

document.addEventListener('scroll', showModalByScroll);

class MenuCard {
    constructor(img, title, descr, price, elementSelector, ...classes) {
        this.img = img;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.converter = 100;
        this.element = document.querySelector(elementSelector);
        this.classes = classes;
        this.toUAH();
    }

    toUAH() {
        this.price = this.price * this.converter;
    }

    render() {
        const div = document.createElement('div');
        if (this.classes.length === 0) {
            div.classList.add('menu__item');
        } else {
            div.classList.add(this.classes);
        }
        div.innerHTML = `
        <img src="${this.img}" alt="vegy">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`
        this.element.append(div);
    }
}

const getMenuData = async () => {
    const request = await fetch(' http://localhost:3000/menu');

    if (!request.ok) {
        throw newError(`Could not fetch ${url}, status: ${request.status}`);
    }
    return await request.json();
}

getMenuData()
    .then(
        (data) => {
            data.forEach(({ img, title, descr, price }) => {
                new MenuCard(img, title, descr, price, '.menu .container').render();
            })
        }
    )
/* 
new MenuCard(
    "img/tabs/elite.jpg",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    229,
    '.menu .container'
).render();

new MenuCard(
    "img/tabs/vegy.jpg",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    550,
    '.menu .container'
).render();

new MenuCard(
    "img/tabs/post.jpg",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container'
).render(); */

// Forms

const forms = document.querySelectorAll('form');
forms.forEach(item => {
    postFormData(item);
});

const messages = {
    success: 'Спасибо! Мы с вами свяжемся',
    failure: 'Что-то пошло не так',
    loading: '../img/loading.gif'
}

const sendFormData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

function postFormData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img');
        statusMessage.classList.add('status');
        statusMessage.src = messages.loading;
        statusMessage.style.cssText = 'display: block; margin: 0 auto; max-width: 5%';
        modal.appendChild(statusMessage);

        const formData = new FormData(form);
        const object = {};
        formData.forEach((value, key) => {
            object[key] = value;
        });

        sendFormData('http://localhost:3000/requests', JSON.stringify(object))
            .then(data => {
                console.log(data);
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                    showThanks(messages.success);
                    setTimeout(() => {
                        closemodalWindow();
                    }, 2000);
                }, 2000);
            }).catch(data => {
                console.log('damn');
                showThanks(messages.failure);
            }).finally(() => {
                console.log('got it');
            })
    });

    function showThanks(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        const thanksDialog = document.createElement('div');
        thanksDialog.innerHTML = `
        <div class="modal__content">
            <div class="modal__close">&times;</div>
        <div class="modal__title">
            ${message}
        </div>
        </div>`
        thanksDialog.classList.add('modal__dialog');
        modal.appendChild(thanksDialog);
    }
}

////slider
/* 
const prevBtn = document.querySelector('.offer__slider-next');
const nextBtn = document.querySelector('.offer__slider-prev');
const slides = document.querySelectorAll('.offer__slide');
let idx = 1;

function showSlides() {
    if (idx > slides.length) {
        idx = 1;
    } else if (idx < 1) {
        idx = slides.length;
    }
    slides.forEach(slide => slide.style.display = 'none');
    slides[idx - 1].style.display = 'block';
}


let currentNumber = document.querySelector('#current');
currentNumber.textContent = '0' + idx;

function plusSlides(n) {
    showSlides(idx += n);
    currentNumber.textContent = '0' + idx;
}

showSlides();

prevBtn.addEventListener('click', () => { plusSlides(1) });
nextBtn.addEventListener('click', () => { plusSlides(-1) });
 */

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


///Calculator 
let sex,
    height,
    weigth,
    age,
    ratio

let result = document.querySelector(".calculating__result span");

function calculate() {
    if (!height || !weigth || !age) {
        result.textContent = '___';
        return;
    }
    if (sex === 'male') {
        result.textContent = (88.36 + (13.4 * weigth) + (4.8 * height) - (5.7 * age)) * ratio;
    } else if (sex === 'female') {
        result.textContent = (447.6 + (9.2 * weigth) + (3.1 * height) - (4.3 * age)) * ratio;
    }
}

calculate();

function getStaticInfo(parentSelector, activeClassName) {
    const element = document.querySelectorAll(`${parentSelector} div`);
    document.querySelector(parentSelector).addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
            ratio = e.target.getAttribute('data-ratio');
        } else if (e.target.getAttribute('id')) {
            sex = e.target.getAttribute('id');
        }
        element.forEach(el => el.classList.remove(activeClassName));
        e.target.classList.add(activeClassName);
        console.log(ratio, sex);
        calculate();
    })

}

getStaticInfo('#gender', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

function getDinamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', (e) => {
        switch (input.getAttribute('id')) {
            case 'height':
                height = +input.value;
                break;
            case 'weight':
                weigth = +input.value;
                break;
            case 'age':
                age = +input.value;
                break;
        }
        calculate();

    })

}

getDinamicInfo('#height');
getDinamicInfo('#weight');
getDinamicInfo('#age');




/* function getStaticInfo(parentSelector, activeClassName) {
    const element = document.querySelectorAll(`${parentSelector} div`);

    document.querySelector(parentSelector).addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute('data-ratio');
        } else if (e.target.getAttribute('id')) {
            sex = e.target.getAttribute('id')
        }

        element.forEach(el => el.classList.remove(activeClassName));

        e.target.classList.add(activeClassName);

        console.log(ratio, sex);
    })
}

getStaticInfo('#gender', 'calculating__choose-item_active');
getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active'); */
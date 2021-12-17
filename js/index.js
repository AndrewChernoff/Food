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

let offset = 0;
let slideIndex = 1;

const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.offer__slider-inner');

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden';

slides.forEach(slide => {
    slide.style.width = width;
});

next.addEventListener('click', () => {
    if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
        offset = 0;
    } else {
        offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
        offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
});

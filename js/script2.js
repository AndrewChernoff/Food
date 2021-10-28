/* const tabContent = document.querySelectorAll('.tabcontent');
const tabsParent = document.querySelector('.tabheader__items');
const tabs = document.querySelectorAll('.tabheader__item');

function hideContent() {
    tabContent.forEach(item => {
        item.style.display = 'none';
    })
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    })
}

function showContent(i = 0) {
    tabContent[i].style.display = 'block';
    tabs[i].classList.add('tabheader__item_active');
}

hideContent();
showContent();


tabsParent.addEventListener('click', (e) => {
    let target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (item == target) {
                hideContent();
                showContent(i);
            }
        })
    }
}) */



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

const deadline = '2021-11-03';

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
const modalBtn = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');

function showModal() {
    modal.classList.add('show');
    document.querySelector('body').style.overflow = 'hidden';
    clearInterval(modalWindowByTime);
}

function removeModal() {
    modal.classList.remove('show');
    document.querySelector('body').style.overflow = '';
}

modalBtn.forEach(el => el.addEventListener('click', () => {
    showModal();
}));

modalClose.addEventListener('click', removeModal);

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        removeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.querySelector('body').style.overflow = '';
    }
});

const modalWindowByTime = setTimeout(showModal, 4000);

function showModalByScroll() {
    if (document.documentElement.clientHeight + window.pageYOffset >= document.documentElement.scrollHeight) {
        showModal();
        window.removeEventListener('scroll', showModalByScroll);
    }
}

window.addEventListener('scroll', showModalByScroll);

class MenuCard {
    constructor(img, title, descr, price, parentSelector, ...classes) {
        this.img = img;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.convert = 27;
        this.classes = classes;
        this.toUAH();
    }

    toUAH() {
        this.price = this.price * this.convert
    }

    render() {
        const div = document.createElement('div');
        if (this.classes.length === 0) {
            div.classList.add('menu__item');
        } else {
            div.classList.add(this.classes);
        }

        div.innerHTML = `
        <img src=${this.img} alt="vegy">
        <h3 class ="menu__item-subtitle">${this.title}</h3>
        <div class ="menu__item-descr">${this.descr}</div>
        <div class ="menu__item-divider"></div>
        <div class ="menu__item-price">
        <div class ="menu__item-cost">Цена: </div>
        <div class ="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
    `
        this.parent.append(div);
    }
}

new MenuCard(
    "img/tabs/elite.jpg",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    229,
    '.menu .container',
).render();

new MenuCard(
    "img/tabs/vegy.jpg",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    550,
    '.menu .container',
).render();

new MenuCard(
    "img/tabs/post.jpg",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container',
).render();




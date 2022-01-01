/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/DAL/dal.js":
/*!***********************!*\
  !*** ./js/DAL/dal.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sendFormData": () => (/* binding */ sendFormData),
/* harmony export */   "getMenuData": () => (/* binding */ getMenuData)
/* harmony export */ });
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

const getMenuData = async () => {
    const request = await fetch(' http://localhost:3000/menu');

    if (!request.ok) {
        throw newError(`Could not fetch ${url}, status: ${request.status}`);
    }
    return await request.json();
}




/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    ///Calculator

    const result = document.querySelector('.calculating__result span');

    let sex = 'female',
        height,
        weight,
        age,
        activity = 1.375;

    if (localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');
    } else {
        activity = 1.375;
        localStorage.setItem('activity', 1.375);
    }

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    function getLocalStorageData(selector, activeClassName) {
        const elements = document.querySelectorAll(`${selector} div`);
        elements.forEach(el => { el.classList.remove(activeClassName) });
        elements.forEach(el => {
            if (el.getAttribute('data-ratio') === localStorage.getItem('activity')) {
                el.classList.add(activeClassName);
            }
            if (el.getAttribute('id') === localStorage.getItem('sex')) {
                el.classList.add(activeClassName);
            }
        })
    }

    getLocalStorageData('#gender', 'calculating__choose-item_active');
    getLocalStorageData('.calculating__choose_big', 'calculating__choose-item_active');


    function calculate() {
        if (!sex || !height || !weight || !age || !activity) {
            result.textContent = '___';
            return;
        }

        if (sex === 'male') {
            result.textContent = Math.ceil((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
        } else if (sex === 'female') {
            result.textContent = Math.ceil((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
        }
    }

    calculate();

    function getParams(attribute, activeClassName) {
        let element = document.querySelectorAll(`${attribute} div`);
        element.forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    activity = +e.target.dataset.ratio;
                    localStorage.setItem('activity', +e.target.dataset.ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
                console.log(activity, sex);
                element.forEach(el => el.classList.remove(activeClassName));
                e.target.classList.add(activeClassName);
                calculate();
            })
        })

    }

    getParams('#gender', 'calculating__choose-item_active');
    getParams('.calculating__choose_big', 'calculating__choose-item_active');

    function getBodyParams(attribute) {
        let input = document.querySelector(attribute);

        input.addEventListener('input', (e) => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            if (input.value.match(/\D/g)) {
                input.style.border = 'red 1px solid';
            } else {
                input.style.border = 'none';
            }
            calculate();
        })
    }

    getBodyParams('#height');
    getBodyParams('#weight');
    getBodyParams('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DAL_dal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../DAL/dal */ "./js/DAL/dal.js");


function cards() {
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

    (0,_DAL_dal__WEBPACK_IMPORTED_MODULE_0__.getMenuData)()
        .then(
            (data) => {
                data.forEach(({ img, title, descr, price }) => {
                    new MenuCard(img, title, descr, price, '.menu .container').render();
                })
            }
        )
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _DAL_dal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../DAL/dal */ "./js/DAL/dal.js");



function forms(modalSelector, formSelector) {
    // Forms

    const forms = document.querySelectorAll(formSelector);
    forms.forEach(item => {
        postFormData(item);
    });

    const messages = {
        success: 'Спасибо! Мы с вами свяжемся',
        failure: 'Что-то пошло не так',
        loading: '../img/loading.gif'
    }

    function postFormData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let modal = document.querySelector(modalSelector);///
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

            (0,_DAL_dal__WEBPACK_IMPORTED_MODULE_1__.sendFormData)('http://localhost:3000/requests', JSON.stringify(object))
                .then(data => {
                    console.log(data);
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                        showThanks(messages.success);
                        setTimeout(() => {
                            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closemodalWindow)((modalSelector));
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
            let modal = document.querySelector(modalSelector);///
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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closemodalWindow": () => (/* binding */ closemodalWindow)
/* harmony export */ });
function openModal(modalSelector, openModalInTime) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
    //console.log(modal);
    clearInterval(openModalInTime);
}

function closemodalWindow(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.querySelector('body').style.overflow = '';
    //// bug with modal window
}

function modal(modalSelector, modalTriggerSelector, openModalInTime) {
    ///Modal
    const modalTrigger = document.querySelectorAll(modalTriggerSelector);
    const modal = document.querySelector(modalSelector);

    modalTrigger.forEach(el => {
        el.addEventListener('click', (e) => {
            openModal(modalSelector, openModalInTime);
        })
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.className === 'modal__close') {
            closemodalWindow(modalSelector);
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closemodalWindow(modalSelector);
        }
    })

    ///const openModalInTime = setTimeout(openModal, 3000); /// 13:00

    function showModalByScroll() {
        if (document.documentElement.clientHeight + window.pageYOffset
            >= document.documentElement.scrollHeight) {
            openModal(modalSelector, openModalInTime);
            document.removeEventListener('scroll', showModalByScroll);
        }
    }

    document.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({ rigthArrow, leftArrow, offerSlide, images, wrapper, slider_Inner }) {
    ////slider
    const nextBtn = document.querySelector(rigthArrow);
    const prevBtn = document.querySelector(leftArrow);
    const slides = document.querySelectorAll(offerSlide);
    const slidesImg = document.querySelectorAll(images);
    const slidesWrapper = document.querySelector(wrapper);
    const sliderInner = document.querySelector(slider_Inner);
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

    prevBtn.addEventListener('click', () => {
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

    nextBtn.addEventListener('click', () => {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsParentSelector, tabsContentSelector, tabsSelector, activeClassName) {
    const tabsParent = document.querySelector(tabsParentSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabs = document.querySelectorAll(tabsSelector);

    function hideContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClassName.slice(1));
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClassName.slice(1));
    }

    hideContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains(tabsParentSelector.slice(1).slice(0, -1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideContent();
                    showTabContent(i);
                }
            })
        }
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/time.js":
/*!****************************!*\
  !*** ./js/modules/time.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function time(timerId, deadline) {
    //Time

    //const deadline = deadline;

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
    setClock(timerId, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (time);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/time */ "./js/modules/time.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");









window.addEventListener('DOMContentLoaded', () => {

    let openModalInTime = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', openModalInTime), 3000);
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__items', '.tabcontent', '.tabheader__item', '.tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('.modal', '[data-modal]', openModalInTime);
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_time__WEBPACK_IMPORTED_MODULE_3__["default"])('.time', '2022-03-03');
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('.modal', 'form');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        rigthArrow: '.offer__slider-next',
        leftArrow: '.offer__slider-prev',
        offerSlide: '.offer__slide',
        images: '.offer__slide img',
        wrapper: '.offer__slider-wrapper',
        slider_Inner: '.offer__slider-inner'
    });
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
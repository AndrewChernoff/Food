import tabs from './modules/tabs';
import modal from './modules/modal';
import cards from './modules/cards';
import time from './modules/time';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    let openModalInTime = setTimeout(() => openModal('.modal', openModalInTime), 3000);
    tabs('.tabheader__items', '.tabcontent', '.tabheader__item', '.tabheader__item_active');
    modal('.modal', '[data-modal]', openModalInTime);
    cards();
    time('.time', '2022-03-03');
    forms('.modal', 'form');
    slider({
        rigthArrow: '.offer__slider-next',
        leftArrow: '.offer__slider-prev',
        offerSlide: '.offer__slide',
        images: '.offer__slide img',
        wrapper: '.offer__slider-wrapper',
        slider_Inner: '.offer__slider-inner'
    });
    calc();
})
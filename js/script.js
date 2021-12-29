window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs');
    const modal = require('./modules/modal');
    const cards = require('./modules/cards');
    const time = require('./modules/time');
    const forms = require('./modules/forms');
    const slider = require('./modules/slider');
    const calc = require('./modules/calc');

    tabs();
    modal();
    cards();
    time();
    forms();
    slider();
    calc();
})
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

module.exports = calc;
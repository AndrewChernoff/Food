import { openModal, closemodalWindow } from './modal';
import { sendFormData } from './../DAL/dal';

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

            sendFormData('http://localhost:3000/requests', JSON.stringify(object))
                .then(data => {
                    console.log(data);
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                        showThanks(messages.success);
                        setTimeout(() => {
                            closemodalWindow((modalSelector));
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

export default forms;
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

export default modal;
export { openModal };
export { closemodalWindow };
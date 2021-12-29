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
}

module.exports = cards;
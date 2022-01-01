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

export default tabs;
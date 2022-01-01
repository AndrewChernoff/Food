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

export default time;
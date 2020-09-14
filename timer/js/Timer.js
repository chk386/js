import {appendTimer, removeTimerElement, decreaseTimerCount} from './view.js'

export class Timer {
    constructor(input, timers) {
        this._count = this.validate(input);
        this._index = timers.push(this);
        this._timerInterval = this.addTimer(timers);
    }

    validate(input) {
        const count = parseInt(input);

        if (Number.isNaN(count) || count < 1 || count > 60) {
            throw new RangeError('1-60까지 숫자만 입력하세요!');
        }

        return count;
    }

    addTimer(timers) {
        const timerInterval = setInterval(() => {
            if (decreaseTimerCount(this._index) === 0) {
                this.removeTimer(timers);
            }
        }, 1000);

        appendTimer(this._index, this._count);

        return timerInterval;
    }

    removeTimer(timers) {
        clearInterval(this._timerInterval);
        timers.splice(timers.indexOf(this), 1);
        removeTimerElement(this._index);
    }
}
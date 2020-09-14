import {removeAllTimersElement} from "./view.js";

export default class Timers extends Array {
    removeAllTimers = function () {
        this.forEach(timer => {
            clearInterval(timer._timerInterval);
        })

        while (this.length > 0) {
            this.pop();
        }

        removeAllTimersElement()
    }
}
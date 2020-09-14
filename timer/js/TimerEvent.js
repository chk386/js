import {Timer} from './Timer.js'

export default class TimerEvent {
    constructor($input, $completed, timers) {
        this._$input = $input;
        this._$completed = $completed;
        this._timers = timers;
        this.bindInputEvent();
        this.bindCompletedEvent();
    }

    bindInputEvent() {
        this._$input.addEventListener("keypress", (e) => {
            if (e.key === 'Enter') {
                try {
                    new Timer(this._$input.value, this._timers);
                } catch (ex) {
                    alert(ex.message);
                } finally {
                    this._$input.value = '';
                }
            }
        });
    }

    bindCompletedEvent() {
        this._$completed.addEventListener("click", (_) => {
            this._timers.removeAllTimers();
        });
    }
}
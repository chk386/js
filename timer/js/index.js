import TimerEvent from './TimerEvent.js';
import Timers from './Timers.js';
import {$input, $completed} from './view.js';

document.addEventListener("DOMContentLoaded", () => {
    new TimerEvent($input, $completed, new Timers());
});
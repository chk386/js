import {$} from "./utils.js";

const $timers = $('#timers');
const timerId = 'timer'

export const $input = $("#input");
export const $completed = $("#completed");

export function appendTimer(index, count) {
    const elemTimer = document.createElement('li');
    elemTimer.innerHTML = `Timer${index} : <span id="${timerId}${index}">${count}</span>`
    $timers.append(elemTimer);
}

export function decreaseTimerCount(idx) {
    const $idx = $(`#${timerId}${idx}`);
    let currentCount;
    currentCount = parseInt($idx.textContent) - 1;
    $idx.textContent = currentCount;

    return currentCount;
}

export function removeTimerElement(idx) {
    $(`#${timerId}${idx}`).parentNode.remove();
}

export function removeAllTimersElement() {
    $timers.innerHTML = '';
}
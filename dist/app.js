"use strict";
let bar = document.querySelector('.graph-bar-fill-js');
let ref = document.querySelector('.ref-val-js');
let calc = document.querySelector('.calc-val-js');
let delta = document.querySelector('.delta-val-js');
let exec = document.querySelector('.ill-js');
let barDiff = document.querySelector('.graph-bar-diff-fill-js');
let meter = document.querySelector('.graph-meter-pin-js');
let barDiffData = document.querySelector('.bar-data-js');
let disc = document.querySelector('.doc-js');
let chartDataFirst = document.querySelector('.chart-data-first-js');
let chartDataSecond = document.querySelector('.chart-data-second-js');
let chartDataThird = document.querySelector('.chart-data-third-js');
let chartBarFirst = document.querySelector('.graph-bar-chart-item-first-js');
let chartBarSecond = document.querySelector('.graph-bar-chart-item-second-js');
let chartBarThird = document.querySelector('.graph-bar-chart-item-third-js');
exec.addEventListener('click', function () {
    if (parseInt(calc === null || calc === void 0 ? void 0 : calc.value) <= parseInt(ref === null || ref === void 0 ? void 0 : ref.value)) {
        let sum = (parseInt(calc === null || calc === void 0 ? void 0 : calc.value) / parseInt(ref === null || ref === void 0 ? void 0 : ref.value)) * 100;
        illustrate(sum);
        outputDisc(sum);
    }
    else
        alert('Please consider a calculation value lower than the reference value.');
});
function outputDisc(sum) {
    let diff = 100 - sum;
    disc.innerText = `${calc.value} is ${Math.round(sum)} percent out of ${ref.value}, with a difference of ${Math.floor(diff)} percent. Invoking a delta factor of ${delta.value}, decrease rate is ${Math.round(sum)}, ${Math.ceil(sum * 0.75 + parseInt(delta.value))}, ${Math.ceil(sum * 0.5 - parseInt(delta.value))}.`;
}
let start;
let previousTimeStamp;
let done = false;
function illustrate(target) {
    let count = 0;
    chartBarThird.style.height = `${0}%`;
    function step(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }
        if (previousTimeStamp !== timestamp) {
            count++;
            meter.style.transform = `rotate(${-90 + count * 1.8}deg)`;
            chartBarFirst.style.height = `${count}%`;
            chartBarSecond.style.height = `${Math.round(count * 0.75 + parseInt(delta.value))}%`;
            chartBarThird.style.height = `${Math.round(count * 0.5 - parseInt(delta.value))}%`;
            let diff = 100 - count;
            barDiff.style.width = `${diff}%`;
            bar.style.width = `${count}%`;
            chartDataFirst.innerText = `${Math.round(count)}%`;
            chartDataSecond.innerText = `${Math.round(count * 0.75 + parseInt(delta.value))}%`;
            chartDataThird.innerText = `${Math.round(count * 0.5 - parseInt(delta.value))}%`;
            barDiffData.innerText = `Diff. ${diff}%`;
            if (count === 200)
                done = true;
        }
        if (count < target) {
            previousTimeStamp = timestamp;
            if (!done)
                window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}
//# sourceMappingURL=app.js.map
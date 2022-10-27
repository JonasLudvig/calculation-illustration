"use strict";
let bar = document.querySelector('.graph-bar-fill-js');
let meter = document.querySelector('.graph-meter-pin-js');
let exec = document.querySelector('.ill-js');
let ref = document.querySelector('.ref-val-js');
let calc = document.querySelector('.calc-val-js');
exec.addEventListener('click', function () {
    if (parseInt(calc === null || calc === void 0 ? void 0 : calc.value) <= parseInt(ref === null || ref === void 0 ? void 0 : ref.value)) {
        let sum = (parseInt(calc === null || calc === void 0 ? void 0 : calc.value) / parseInt(ref === null || ref === void 0 ? void 0 : ref.value)) * 100;
        illustrate(sum);
    }
    else {
        alert('Please consider a calculation value lower than the reference value.');
    }
});
let start;
let previousTimeStamp;
let done = false;
function illustrate(target) {
    let count = 0;
    function step(timestamp) {
        if (start === undefined) {
            start = timestamp;
        }
        if (previousTimeStamp !== timestamp) {
            count++;
            bar.style.width = `${count}%`;
            meter.style.transform = `rotate(${90 + count * 1.8}deg)`;
            if (count === 200)
                done = true;
        }
        if (count < target) {
            previousTimeStamp = timestamp;
            if (!done) {
                window.requestAnimationFrame(step);
            }
        }
    }
    window.requestAnimationFrame(step);
}
//# sourceMappingURL=app.js.map
let bar = document.querySelector('.graph-bar-fill-js') as HTMLElement;
let meter = document.querySelector('.graph-meter-pin-js') as HTMLElement;
let exec = document.querySelector('.ill-js') as HTMLElement;
let ref = document.querySelector('.ref-val-js') as HTMLInputElement;
let calc = document.querySelector('.calc-val-js') as HTMLInputElement;

exec!.addEventListener('click', function () {
  if (parseInt(calc?.value) <= parseInt(ref?.value)) {
    let sum = (parseInt(calc?.value) / parseInt(ref?.value)) * 100;
    illustrate(sum);
  } else {
    alert(
      'Please consider a calculation value lower than the reference value.'
    );
  }
});

let start: number;
let previousTimeStamp: number;
let done = false;

function illustrate(target: number) {
  let count = 0;
  function step(timestamp: number) {
    if (start === undefined) {
      start = timestamp;
    }

    if (previousTimeStamp !== timestamp) {
      count++;
      bar.style.width = `${count}%`;
      meter.style.transform = `rotate(${90 + count * 1.8}deg)`;

      if (count === 200) done = true;
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

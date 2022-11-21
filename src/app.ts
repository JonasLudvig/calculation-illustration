let ref = document.querySelector('.ref-val-js') as HTMLInputElement;
let calc = document.querySelector('.calc-val-js') as HTMLInputElement;
let delta = document.querySelector('.delta-val-js') as HTMLInputElement;
let exec = document.querySelector('.ill-js') as HTMLElement;
let meter = document.querySelector('.graph-meter-pin-js') as HTMLElement;
let bar = document.querySelector('.graph-bar-fill-js') as HTMLElement;
let barDiffData = document.querySelector('.bar-data-js') as HTMLElement;
let disc = document.querySelector('.disc-js') as HTMLElement;
let chartDataFirst = document.querySelector(
  '.chart-data-first-js'
) as HTMLElement;
let chartDataSecond = document.querySelector(
  '.chart-data-second-js'
) as HTMLElement;
let chartDataThird = document.querySelector(
  '.chart-data-third-js'
) as HTMLElement;
let chartBarFirst = document.querySelector(
  '.graph-bar-chart-item-first-js'
) as HTMLElement;
let chartBarSecond = document.querySelector(
  '.graph-bar-chart-item-second-js'
) as HTMLElement;
let chartBarThird = document.querySelector(
  '.graph-bar-chart-item-third-js'
) as HTMLElement;

exec!.addEventListener('click', function () {
  if (parseInt(calc?.value) <= parseInt(ref?.value)) {
    let sum = (parseInt(calc?.value) / parseInt(ref?.value)) * 100;
    illustrate(sum);
    outputDisc(sum);
  } else alert('Please consider a calculation value lower than the reference value.');
});

function outputDisc(sum: number) {
  let diff = 100 - sum;

  disc.innerText = `${calc.value} is ${Math.round(sum)} percent out of ${
    ref.value
  }, with a difference of ${Math.floor(
    diff
  )} percent. Invoking a delta factor of ${
    delta.value
  }, decrease rate is ${Math.round(sum)}, ${Math.ceil(
    sum * 0.75 + parseInt(delta.value)
  )}, ${Math.ceil(sum * 0.5 - parseInt(delta.value))}.`;
}

let start: number;
let previousTimeStamp: number;
let done = false;

function illustrate(target: number) {
  let count = 0;
  chartBarThird.style.height = `${0}%`;

  function step(timestamp: number) {
    if (start === undefined) start = timestamp;

    if (previousTimeStamp !== timestamp) {
      count++;

      meter.style.transform = `rotate(${-90 + count * 1.8}deg)`;
      chartBarFirst.style.height = `${count}%`;
      chartBarSecond.style.height = `${Math.round(
        count * 0.75 + parseInt(delta.value)
      )}%`;
      chartBarThird.style.height = `${Math.round(
        count * 0.5 - parseInt(delta.value)
      )}%`;

      let diff = 100 - count;

      bar.style.width = `${diff}%`;
      chartDataFirst.innerText = `${Math.round(count)}%`;
      chartDataSecond.innerText = `${Math.round(
        count * 0.75 + parseInt(delta.value)
      )}%`;
      chartDataThird.innerText = `${Math.round(
        count * 0.5 - parseInt(delta.value)
      )}%`;
      barDiffData.innerText = `Diff. ${diff}%`;

      if (count === 200) done = true;
    }
    if (count < target) {
      previousTimeStamp = timestamp;

      if (!done) window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

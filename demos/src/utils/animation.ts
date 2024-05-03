export function runAtInterval(fn: () => void, interval: number) {
  let lastTime = 0;

  function frame(timestamp: number) {
    if (timestamp - lastTime >= interval) {
      lastTime = timestamp;
      fn();
    }
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

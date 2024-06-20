export function runAtInterval(fn: () => void, interval: number) {
  let lastTime = 0;
  let frameId: number | null = null;

  function frame(timestamp: number) {
    if (timestamp - lastTime >= interval) {
      lastTime = timestamp;
      fn();
    }
    frameId = requestAnimationFrame(frame);
  }

  frameId = requestAnimationFrame(frame);

  return () => {
    if (frameId != null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  };
}

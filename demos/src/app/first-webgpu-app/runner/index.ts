import { runAtInterval } from "@/utils/animation";

import initGame from "./initGame";
import generateResources from "./generateResources";
import getUpdateGrid from "./getUpdateGrid";

const runGame = async (
  canvas: HTMLCanvasElement,
  gridSize: number,
  interval: number
) => {
  const initGameResult = await initGame(canvas);
  const resources = generateResources({ gridSize, ...initGameResult });

  const updateGrid = getUpdateGrid({
    gridSize,
    ...initGameResult,
    ...resources,
  });

  let step = 0;
  const cancelAnimation = runAtInterval(() => {
    updateGrid(step);
    step++;
  }, interval);

  return () => {
    cancelAnimation();
  };
};

export default runGame;

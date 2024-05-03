import { useRef, useEffect } from "react";

import runGame from "../runner";

const GRID_SIZE = 32;
const UPDATE_INTERVAL = 200;

const useGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  // To prevent running a hook twice in development
  const runningOnceRef = useRef<boolean>(false);

  useEffect(() => {
    if (!runningOnceRef.current) {
      runGame(canvasRef.current, GRID_SIZE, UPDATE_INTERVAL);
      runningOnceRef.current = true;
    }
  }, []);

  return { canvasRef };
};

export default useGame;

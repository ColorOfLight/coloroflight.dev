import { useRef, useEffect, useCallback } from "react";
import { button, useControls } from "leva";

import runGame from "../runner";

const useGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const gameDestroyRef = useRef<() => void>();

  // For preventing running twice in development env.
  const onceRef = useRef<boolean>(false);

  const rerunGame = useCallback(
    async (gridSize: number, timeInterval: number) => {
      if (gameDestroyRef.current != null) {
        gameDestroyRef.current();
      }

      const destroyNewGame = await runGame(
        canvasRef.current,
        gridSize,
        timeInterval
      );

      gameDestroyRef.current = destroyNewGame;
    },
    []
  );

  const { gridSize, timeInterval } = useControls({
    gridSize: { value: 32, min: 8, max: 256, step: 1 },
    timeInterval: { value: 200, min: (1 / 60) * 1000, max: 1000, step: 1 },
    rerunGame: button((get) => {
      rerunGame(get("gridSize"), get("timeInterval"));
    }),
  });

  useEffect(() => {
    (async () => {
      if (!onceRef.current) {
        onceRef.current = true;

        const destroyGame = await runGame(
          canvasRef.current,
          gridSize,
          timeInterval
        );
        gameDestroyRef.current = destroyGame;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { canvasRef };
};

export default useGame;

import { useState, useCallback } from "react";

import useEmscripten from "@/hooks/useEmscripten";

const Content = (): JSX.Element => {
  const [result, setResult] = useState<number | null>(null);
  const { isLoaded: isModuleLoaded, emscriptenModule } = useEmscripten();

  const simulateDiceTrials = useCallback(() => {
    if (!isModuleLoaded || emscriptenModule === undefined) {
      throw new Error("Emscripten module not loaded");
    }

    return emscriptenModule.simulate_dice_trials;
  }, [isModuleLoaded, emscriptenModule]);

  const rollDice = useCallback(async () => {
    const simulate = await simulateDiceTrials();
    const results = simulate(1);

    const keys = results.keys();

    for (let i = 0; i < keys.size(); ++i) {
      const key = keys.get(i);
      const value = results.get(key);
      if (value > 0) {
        setResult(key);
        return;
      }
    }

    throw new Error("No dice value found");
  }, [simulateDiceTrials]);

  return (
    <>
      <div className="border my-4 p-4 flex rounded gap-4 items-center">
        <button
          className="border px-4 py-2 rounded bg-slate-500/15 hover:bg-slate-200/20"
          onClick={rollDice}
        >
          Roll a dice!
        </button>
        <p>Result: {result ?? ""}</p>
      </div>
    </>
  );
};

export default Content;

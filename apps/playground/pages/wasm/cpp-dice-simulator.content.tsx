import { useEffect } from "react";

import useEmscripten from "@/hooks/useEmscripten";
import { ExtraFunctions } from "@/public/emscripten/simulate_dice_trials";

const Content = (): JSX.Element => {
  const { moduleLoaded, createModule, Script } = useEmscripten<ExtraFunctions>(
    "/emscripten/simulate_dice_trials.js"
  );

  useEffect(() => {
    const runSimulate = async () => {
      const wasmModule = await createModule();

      const results = wasmModule.simulate_dice_trials(100);

      const keys = results.keys();

      for (let i = 0; i < keys.size(); ++i) {
        const key = keys.get(i);
        const value = results.get(key);
        console.log("Dice value " + key + ": " + value);
      }
    };

    if (moduleLoaded) {
      runSimulate();
    }
  }, [moduleLoaded]);

  return (
    <>
      <Script />
    </>
  );
};

export default Content;

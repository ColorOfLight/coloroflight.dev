import { useEffect, useState } from "react";
import Script from "next/script";

const Content = (): JSX.Element => {
  const [moduleLoaded, setModuleLoaded] = useState(false);

  const [a, setA] = useState(false);

  useEffect(() => {
    // TODO: Replace with the appropriate wasm module
    const test = async () => {
      const wasmModule = await window.createModule();

      const results = wasmModule.simulate_dice_trials(1, 1000000);

      const keys = results.keys();
      for (let i = 0; i < keys.size(); ++i) {
        const key = keys.get(i);
        const value = results.get(key);
        console.log("Dice value " + key + ": " + value);
      }
    };

    if (moduleLoaded) {
      test();
    }
  }, [moduleLoaded]);

  return (
    <>
      <Script
        src="/wasm/simulate_dice_trials.js"
        onLoad={() => {
          setModuleLoaded(true);
        }}
      />
    </>
  );
};

export default Content;

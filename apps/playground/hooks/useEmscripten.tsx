import { useState } from "react";
import Script from "next/script";

const useEmscripten = <ExtraFunctions = {},>(modulePath: string) => {
  const [moduleLoaded, setModuleLoaded] = useState(false);
  const [moduleError, setModuleError] = useState<Error | null>(null);

  const createModule = async () => {
    if (!moduleLoaded) {
      throw new Error("Module not loaded");
    }

    if (moduleError) {
      throw moduleError;
    }

    return (window as any).createModule() as EmscriptenModule & ExtraFunctions;
  };

  const EmscriptenScript = () => (
    <Script
      src={modulePath}
      onLoad={() => setModuleLoaded(true)}
      onError={() => setModuleError(new Error("Failed to load module"))}
    />
  );

  return {
    moduleLoaded,
    createModule,
    Script: EmscriptenScript,
  };
};

export default useEmscripten;

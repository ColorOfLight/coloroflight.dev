import { useState, useEffect } from "react";

const useEmscripten = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [emscriptenModule, setEmscriptenModule] =
    useState<ExtendedEmscriptenModule>();

  useEffect(() => {
    if (window.createEmscriptenModule === undefined) {
      throw new Error("Emscripten module not found");
    }

    window.createEmscriptenModule().then((module) => {
      setEmscriptenModule(module);
      setIsLoaded(true);
    });
  }, []);

  return {
    isLoaded,
    emscriptenModule,
  };
};

export default useEmscripten;

import { useState, useEffect } from "react";

import { WasmModule } from "@/wasm/_types";

const useEmscriptenModule = <M extends WasmModule<MF>, MF>(
  wasmModule: M & WasmModule<MF>,
  wasmBinaryPath: string
) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [emModule, setEmModule] = useState<EmscriptenModule & MF>();

  useEffect(() => {
    wasmModule({
      instantiateWasm(
        imports: WebAssembly.Imports,
        successCallback: (instance: WebAssembly.Instance) => void
      ) {
        WebAssembly.instantiateStreaming(fetch(wasmBinaryPath), imports)
          .then((instance) => {
            successCallback(instance.instance);
          })
          .catch((error) => {
            throw error;
          });
        return {};
      },
    }).then((module) => {
      setEmModule(module);
      setIsLoaded(true);
    });
  }, [wasmModule, wasmBinaryPath]);

  return {
    isLoaded,
    emModule,
  };
};

export default useEmscriptenModule;

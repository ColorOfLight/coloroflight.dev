import { useCallback, useRef, useState } from "react";
import Image from "next/image";

import useEmscriptenModule from "@/hooks/useEmscriptenModule";
import Module from "@/wasm/module";
import ModuleWasm from "@/wasm/module.wasm";

const Content = (): JSX.Element => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [outImageLink, setOutImageLink] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const { emModule, isLoaded: isModuleLoaded } = useEmscriptenModule(
    Module,
    ModuleWasm
  );

  const flipImage = useCallback(async () => {
    if (isModuleLoaded && emModule) {
      setIsLoading(true);

      const img = imageRef.current;
      if (img == null) {
        throw new Error("Image not found");
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx == null) {
        throw new Error("Canvas context not found");
      }

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(async (blob) => {
        if (blob == null) {
          throw new Error("Failed to convert canvas to blob");
        }

        const arrayBuffer = await blob.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        emModule.FS.writeFile("/input.png", data);

        emModule.flipImage();

        const outputData = emModule.FS.readFile("/output.png");
        const outputBlob = new Blob([outputData], { type: "image/png" });
        const url = URL.createObjectURL(outputBlob);

        setOutImageLink(url);
      }, "image/png");

      canvas.remove();

      setIsLoading(false);
    }
  }, [isModuleLoaded, emModule]);

  return (
    <>
      <div className="border my-4 p-4 flex rounded gap-4 items-center justify-around flex-col lg:flex-row">
        <Image
          src="/shark.png"
          width="200"
          height="200"
          ref={imageRef}
          alt="sample image"
        />

        <button
          className="border px-4 py-2 rounded bg-slate-500/15 hover:bg-slate-200/20"
          onClick={flipImage}
          disabled={isLoading}
        >
          Flip Image!
        </button>
        {outImageLink != null ? (
          <Image
            src={outImageLink}
            width="200"
            height="200"
            alt="output image"
          />
        ) : (
          <div className="w-200px h-200px invisible" />
        )}
      </div>
    </>
  );
};

export default Content;

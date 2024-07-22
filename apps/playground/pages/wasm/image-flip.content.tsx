import { useState, useCallback, useRef } from "react";
import Image from "next/image";

import useEmscriptenModule from "@/hooks/useEmscriptenModule";
import Module from "@/wasm/module";
import ModuleWasm from "@/wasm/module.wasm";

const Content = (): JSX.Element => {
  const imageRef = useRef<HTMLImageElement>(null);
  const outImageRef = useRef<HTMLImageElement>(null);
  const { emModule, isLoaded: isModuleLoaded } = useEmscriptenModule(
    Module,
    ModuleWasm
  );

  const flipImage = useCallback(async () => {
    if (isModuleLoaded && emModule) {
      // Get image data from the input image ref
      const img = imageRef.current;
      if (img == null) {
        throw new Error("Image not found");
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx == null) {
        throw new Error("Canvas context not found");
      }

      canvas.width = img.naturalWidth; // Use naturalWidth and naturalHeight
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      // Convert canvas to image data
      canvas.toBlob(async (blob) => {
        if (blob == null) {
          throw new Error("Failed to convert canvas to blob");
        }

        const arrayBuffer = await blob.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        emModule.FS.mkdir("/working");

        // Write image data to the Emscripten file system
        emModule.FS.writeFile("/working/input.png", data);

        // Call the flipImage function
        emModule.flipImage();

        // Retrieve the output.png from the file system
        const outputData = emModule.FS.readFile("/working/output.png");
        const outputBlob = new Blob([outputData], { type: "image/png" });
        const url = URL.createObjectURL(outputBlob);

        if (outImageRef.current == null) {
          throw new Error("Output image not found");
        }
        outImageRef.current.src = url;
      }, "image/png");
    }
  }, [isModuleLoaded, emModule]);

  return (
    <>
      <div className="border my-4 p-4 flex rounded gap-4 items-center">
        <Image
          src="/shark.png"
          width="200"
          height="200"
          ref={imageRef}
          alt="sample image"
        />
        <Image
          src=""
          width="200"
          height="200"
          ref={outImageRef}
          alt="output image"
        />
        <button
          className="border px-4 py-2 rounded bg-slate-500/15 hover:bg-slate-200/20"
          onClick={flipImage}
        >
          Flip Image!
        </button>
      </div>
    </>
  );
};

export default Content;

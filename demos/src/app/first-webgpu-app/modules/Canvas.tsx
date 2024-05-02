"use client";

import useWebGPU from "../hooks/useWebGPU";

const Canvas = () => {
  const { canvasRef } = useWebGPU();

  return (
    <canvas
      width="512"
      height="512"
      className="border-slate-300 border"
      ref={canvasRef}
    />
  );
};

export default Canvas;

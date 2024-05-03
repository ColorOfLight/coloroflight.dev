"use client";

import useGame from "../hooks/useGame";

const Canvas = () => {
  const { canvasRef } = useGame();

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

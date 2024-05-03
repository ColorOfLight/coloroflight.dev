import Canvas from "./organisms/Canvas";

export default function FirstWebGPUPage() {
  return (
    <div className="flex flex-col h-full p-16 gap-4">
      <h2 className="text-2xl font-semibold">WebGPU Conway&apos;s Game</h2>
      <p className="text-slate-500">
        Implement{" "}
        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          target="_blank"
          className="underline text-sky-600"
        >
          Conway&apos;s Game of Life
        </a>{" "}
        with using WebGPU. The base code is from{" "}
        <a
          href="https://codelabs.developers.google.com/your-first-webgpu-app"
          target="_blank"
          className="underline text-sky-600"
        >
          Google CodeLab
        </a>
        .
      </p>
      <div className="grow-0">
        <Canvas />
      </div>
    </div>
  );
}

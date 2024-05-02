import Canvas from "./modules/Canvas";

export default function FirstWebGPUPage() {
  return (
    <div className="flex flex-col h-full p-16 gap-4">
      <h2 className="text-2xl font-semibold">First WebGPU App (by Google)</h2>
      <p className="text-slate-500">
        Implement Conway&apos;s Game of Life with using WebGPU. The instruction
        is offered by Google CodeLab.
      </p>
      <div className="grow-0">
        <Canvas />
      </div>
    </div>
  );
}

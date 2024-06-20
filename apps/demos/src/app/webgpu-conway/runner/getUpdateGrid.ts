type GetUpdateGridParams = {
  gridSize: number;
  device: GPUDevice;
  context: GPUCanvasContext;
  vertexBuffer: GPUBuffer;
  cellPipeline: GPURenderPipeline;
  simulationPipeline: GPUComputePipeline;
  bindGroups: GPUBindGroup[];
};

const getUpdateGrid = ({
  gridSize,
  device,
  context,
  vertexBuffer,
  cellPipeline,
  simulationPipeline,
  bindGroups,
}: GetUpdateGridParams): ((step: number) => void) => {
  return (step: number) => {
    // Start a render pass
    const computeEncoder = device.createCommandEncoder();
    const computePass = computeEncoder.beginComputePass();

    computePass.setPipeline(simulationPipeline);
    computePass.setBindGroup(0, bindGroups[step % 2]);

    const workgroupCount = Math.ceil(gridSize / 8);
    computePass.dispatchWorkgroups(workgroupCount, workgroupCount);

    computePass.end();
    device.queue.submit([computeEncoder.finish()]);

    step++; // Increment the step count

    // Draw the grid.
    const cellEncoder = device.createCommandEncoder();
    const pass = cellEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          loadOp: "clear" as const,
          clearValue: { r: 0, g: 0, b: 0.4, a: 1.0 },
          storeOp: "store" as const,
        },
      ],
    });
    pass.setPipeline(cellPipeline);
    pass.setBindGroup(0, bindGroups[step % 2]);
    pass.setVertexBuffer(0, vertexBuffer);
    pass.draw((6 * 2) / 2, gridSize * gridSize);

    // End the render pass and submit the command buffer
    pass.end();
    device.queue.submit([cellEncoder.finish()]);
  };
};

export default getUpdateGrid;

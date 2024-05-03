import vertexShader from "../shaders/vertex.wgsl";
import fragmentShader from "../shaders/fragment.wgsl";
import computeShader from "../shaders/compute.wgsl";

type initGameResult = {
  device: GPUDevice;
  context: GPUCanvasContext;
  canvasFormat: GPUTextureFormat;
  vertexBuffer: GPUBuffer;
  vertexBufferLayout: GPUVertexBufferLayout;
  vertexShaderModule: GPUShaderModule;
  fragmentShaderModule: GPUShaderModule;
  simulationShaderModule: GPUShaderModule;
  bindGroupLayout: GPUBindGroupLayout;
  pipelineLayout: GPUPipelineLayout;
  cellPipeline: GPURenderPipeline;
  simulationPipeline: GPUComputePipeline;
};

const initGame = async (canvas: HTMLCanvasElement): Promise<initGameResult> => {
  if (navigator.gpu == null) {
    throw new Error("WebGPU not supported on this browser.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (adapter == null) {
    throw new Error("No appropriate GPUAdapter found.");
  }

  const device = await adapter.requestDevice();

  const context = canvas.getContext("webgpu");
  if (context == null) {
    throw new Error("No WebGPU context found.");
  }

  const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device: device,
    format: canvasFormat,
  });

  const vertices = new Float32Array([
    //   X,    Y,
    -0.8,
    -0.8, // Triangle 1 (Blue)
    0.8,
    -0.8,
    0.8,
    0.8,

    -0.8,
    -0.8, // Triangle 2 (Red)
    0.8,
    0.8,
    -0.8,
    0.8,
  ]);
  const vertexBuffer = device.createBuffer({
    label: "Cell vertices",
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, /*bufferOffset=*/ 0, vertices);

  const vertexBufferLayout: GPUVertexBufferLayout = {
    arrayStride: 8,
    attributes: [
      {
        format: "float32x2" as const,
        offset: 0,
        shaderLocation: 0, // Position, see vertex shader
      },
    ],
  };

  const vertexShaderModule = device.createShaderModule({
    label: "Cell vertex shader",
    code: vertexShader,
  });

  const fragmentShaderModule = device.createShaderModule({
    label: "Cell fragment shader",
    code: fragmentShader,
  });

  const simulationShaderModule = device.createShaderModule({
    label: "Game of Life simulation shader",
    code: computeShader,
  });

  const bindGroupLayout = device.createBindGroupLayout({
    label: "Cell Bind Group Layout",
    entries: [
      {
        binding: 0,
        // Add GPUShaderStage.FRAGMENT here if you are using the `grid` uniform in the fragment shader.
        visibility:
          GPUShaderStage.VERTEX |
          GPUShaderStage.FRAGMENT |
          GPUShaderStage.COMPUTE,
        buffer: {}, // Grid uniform buffer
      },
      {
        binding: 1,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.COMPUTE,
        buffer: { type: "read-only-storage" as const }, // Cell state input buffer
      },
      {
        binding: 2,
        visibility: GPUShaderStage.COMPUTE,
        buffer: { type: "storage" as const }, // Cell state output buffer
      },
    ],
  });

  const pipelineLayout = device.createPipelineLayout({
    label: "Cell Pipeline Layout",
    bindGroupLayouts: [bindGroupLayout],
  });

  const cellPipeline = device.createRenderPipeline({
    label: "Cell pipeline",
    layout: pipelineLayout,
    vertex: {
      module: vertexShaderModule,
      entryPoint: "vertexMain",
      buffers: [vertexBufferLayout],
    },
    fragment: {
      module: fragmentShaderModule,
      entryPoint: "fragmentMain",
      targets: [
        {
          format: canvasFormat,
        },
      ],
    },
  });

  const simulationPipeline = device.createComputePipeline({
    label: "Simulation pipeline",
    layout: pipelineLayout,
    compute: {
      module: simulationShaderModule,
      entryPoint: "computeMain",
    },
  });

  return {
    device,
    context,
    canvasFormat,
    vertexBuffer,
    vertexBufferLayout,
    vertexShaderModule,
    fragmentShaderModule,
    simulationShaderModule,
    bindGroupLayout,
    pipelineLayout,
    cellPipeline,
    simulationPipeline,
  };
};

export default initGame;

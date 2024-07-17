interface ModuleOptions {
  instantiateWasm(
    imports: WebAssembly.Imports,
    successCallback: (instance: WebAssembly.Instance) => void
  ): WebAssembly.Imports;
}

export type WasmModule<T> = (
  options: ModuleOptions
) => Promise<EmscriptenModule & T>;

export interface EmVector<Value> {
  get: (key: number) => Value;
  size: () => number;
}

export interface EmMap<Key extends number | string, Value> {
  get: (key: Key) => Value;
  keys: () => EmVector<Key>;
}

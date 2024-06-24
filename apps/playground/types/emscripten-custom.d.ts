interface Window {
  createEmscriptenModule: () => Promise<ExtendedEmscriptenModule>;
}

interface EmVector<Value> {
  get: (key: index) => Value;
  size: () => number;
}

interface EmMap<Key extends number | string, Value> {
  get: (key: Key) => Value;
  keys: () => EmVector<Key>;
}

// Manually created interface
interface ExtendedEmscriptenModule extends EmscriptenModule {
  simulate_dice_trials: (numTrials: number) => EmMap<number, number>;
}

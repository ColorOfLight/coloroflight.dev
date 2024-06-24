interface EmVector<Value> {
  get: (key: index) => Value;
  size: () => number;
}

interface EmMap<Key extends number | string, Value> {
  get: (key: Key) => Value;
  keys: () => EmVector<Key>;
}

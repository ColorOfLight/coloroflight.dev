# playground.coloroflight.dev

## Dependencies

### Web

- Nextra

### How to compile cpp to WASM

- Install Emscripten dependencies in [Platform-specific notes](https://emscripten.org/docs/getting_started/downloads.html#platform-notes-installation-instructions-sdk)
- Clone Emscripten git to `emsdk` directory
- Run following commands:

```zsh
# Fetch the latest version of the emsdk (not needed the first time you clone)
git pull

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active" for the current user. (writes .emscripten file)
./emsdk activate latest

# Activate PATH and other environment variables in the current terminal
source ./emsdk_env.sh
```

- run command to generate wasm file (This instruction should be fixed):

```zsh
emcc {YOUR_CPP_FILE} -s EXPORTED_FUNCTIONS="['_add_one']" -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -o add.js
```

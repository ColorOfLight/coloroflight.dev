# playground.coloroflight.dev

## Dependencies

### Web

- Nextra

### How to compile cpp to WASM

- Install Emscripten dependencies in [Platform-specific notes](https://emscripten.org/docs/getting_started/downloads.html#platform-notes-installation-instructions-sdk)
- Clone Emscripten git to `emsdk` directory
- Run following commands:

```zsh
# Move to emsdk directory
cd emsdk

# Fetch the latest version of the emsdk (not needed the first time you clone)
git pull

# Download and install the latest SDK tools.
./emsdk install latest

# Make the "latest" SDK "active" for the current user. (writes .emscripten file)
./emsdk activate latest

# Activate PATH and other environment variables in the current terminal
source ./emsdk_env.sh

# Move back to root directory
cd ..
```

- run command to generate wasm file:

```zsh
# You can add compressing options like -O0, -O2, -Oz, and etc.

emcc cpps/{TARGET_CPP_FILE} -o public/emscripten/{OUTPUT_NAME} -s EXPORTED_RUNTIME_METHODS=cwrap,ccall -s MODULARIZE=1 -s EXPORT_NAME='createEmscriptenModule' -s ENVIRONMENT=web --bind
```

- Update types in `types/emscripten-custom.d.ts` for extra functions

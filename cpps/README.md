# C++ Projects

## Pre-requisite

### CMake

- [Install CMake](https://cmake.org/download/)

### Emscripten

- Download & Install

```zsh
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```

## How to build

```zsh
mkdir build && cd build
cmake --preset=default ..
make
````

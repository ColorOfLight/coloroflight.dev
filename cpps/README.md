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

### VCpkg

- Download & Install

```zsh
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg
./bootstrap-vcpkg.sh
```

## How to build

```zsh
mkdir build && cd build
cmake -DCMAKE_TOOLCHAIN_FILE=../emsdk/upstream/emscripten/cmake/Modules/Platform/Emscripten.cmake ..
make
````

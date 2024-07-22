cmake_minimum_required(VERSION 3.10)
project(ColorOfLight)

# Set C++ standard globally
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set output directory
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

if(NOT DEFINED ENV{EMSCRIPTEN_ROOT})
   find_path(EMSCRIPTEN_ROOT "emcc")
else()
   set(EMSCRIPTEN_ROOT "$ENV{EMSCRIPTEN_ROOT}")
endif()

if(NOT EMSCRIPTEN_ROOT)
   if(NOT DEFINED ENV{EMSDK})
      message(FATAL_ERROR "The emcc compiler not found in PATH")
   endif()
   set(EMSCRIPTEN_ROOT "$ENV{EMSDK}/upstream/emscripten")
endif()

if(EXISTS "${EMSCRIPTEN_ROOT}/cmake/Modules/Platform/Emscripten.cmake")
   set(CMAKE_TOOLCHAIN_FILE "${EMSCRIPTEN_ROOT}/cmake/Modules/Platform/Emscripten.cmake")
else()
  message(FATAL_ERROR "Emscripten.cmake toolchain file not found")
endif()

# Include directories
include_directories(include)
include_directories(third-party)
include_directories(${EMSCRIPTEN_ROOT}/system/include)

# Add source files
file(GLOB_RECURSE SOURCES src/*.cpp third-party/*.cpp include/*.h third-parth/*.h)

add_executable(module ${SOURCES} src/em_main.cpp)
set_target_properties(module PROPERTIES LINK_FLAGS "-O3 -s WASM=1 -s EXPORTED_RUNTIME_METHODS=cwrap,ccall,FS -s MODULARIZE=1 -s EXPORT_ES6=1 -s ENVIRONMENT=web --bind")

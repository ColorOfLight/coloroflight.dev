cmake_minimum_required(VERSION 3.10)
project(ColorOfLight)

# Set C++ standard globally
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Enable vcpkg
if(DEFINED ENV{VCPKG_ROOT} AND NOT DEFINED CMAKE_TOOLCHAIN_FILE)
    set(CMAKE_TOOLCHAIN_FILE "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake")
endif()

# Set output directory
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

# Include directories
include_directories(include)

# Add source files
file(GLOB_RECURSE SOURCES src/*.cpp include/*.h)

add_executable(moduleDice ${SOURCES} src/simulate_dice_trials.cpp)
set_target_properties(moduleDice PROPERTIES LINK_FLAGS "-O3 -s WASM=1 -s EXPORTED_RUNTIME_METHODS=cwrap,ccall,FS -s MODULARIZE=1 -s EXPORT_ES6=1 -s ENVIRONMENT=web --bind")

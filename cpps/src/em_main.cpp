#include <emscripten/bind.h>

#include <map>
#include <random>

#include "./file.h"
#include "./image.h"

void FlipImage() {
  Image<RgbaColor> image = ReadPng("/input.png");
  image.FlipX();

  WritePng("/output.png", image);
}

std::map<int, int> simulate_dice_trials(int trials) {
  std::map<int, int> result;

  // Random number generation using C++ random library
  std::random_device rd;
  std::mt19937 gen(rd());
  std::uniform_int_distribution<> dis(1, 6);

  for (int t = 0; t < trials; ++t) {
    result[dis(gen)]++;
  }

  return result;
}

// Binding code
EMSCRIPTEN_BINDINGS(module) {
  emscripten::function("flipImage", &FlipImage);
  emscripten::function("simulate_dice_trials", &simulate_dice_trials);
  emscripten::register_map<int, int>("map<int, int>");
  emscripten::register_vector<int>("vector<int>");
}

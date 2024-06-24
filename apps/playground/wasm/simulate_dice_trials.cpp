#include <map>
#include <random>
#include <emscripten/bind.h>

using namespace std;

map<int, int> simulate_dice_trials(int nDices, int trials)
{
  map<int, int> result;

  // Random number generation using C++ random library
  random_device rd;
  mt19937 gen(rd());
  uniform_int_distribution<> dis(1, 6);

  for (int t = 0; t < trials; ++t)
  {
    int sum = 0;
    for (int d = 0; d < nDices; ++d)
    {
      sum += dis(gen);
    }
    result[sum]++;
  }

  return result;
}

// Binding code
EMSCRIPTEN_BINDINGS(module)
{
  emscripten::function("simulate_dice_trials", &simulate_dice_trials);
  emscripten::register_map<int, int>("map<int, int>");
  emscripten::register_vector<int>("vector<int>");
}

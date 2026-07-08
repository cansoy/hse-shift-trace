#pragma once

#include <algorithm>
#include <cstdint>
#include <stdexcept>
#include <string>
#include <vector>

namespace say {
    std::string under_100(int number);
    std::string under_1000(int number);
    std::string in_english(std::int64_t number);
}

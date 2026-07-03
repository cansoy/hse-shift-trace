#pragma once

#include <iostream>
#include <vector>
#include <algorithm>

namespace triangle
{
    enum class flavor
    {
        equilateral,
        isosceles,
        scalene,
    };

    flavor kind(const double &, const double &, const double &);

} // namespace triangle

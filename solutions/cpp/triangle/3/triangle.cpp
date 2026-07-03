#include "triangle.h"

namespace triangle
{
    flavor kind(const double &first, const double &second, const double &third)
    {
        bool is_ok_first{(first <= second + third)};
        bool is_ok_second{(second <= first + third)};
        bool is_ok_third{(third <= second + first)};

        if (!is_ok_first || !is_ok_second || !is_ok_third)
            throw std::domain_error("invalid triangle !");
        else if (first <= 0 || second <= 0 || third <= 0)
            throw std::domain_error("invalid triangle !");

        std::vector<double> edges{first, second, third};
        std::sort(edges.begin(), edges.end());
        auto new_end = std::unique(edges.begin(), edges.end());
        edges.erase(new_end, edges.end());

        if (edges.size() == 1)
            return flavor::equilateral;
        else if (edges.size() == 2)
            return flavor::isosceles;
        else if (edges.size() == 3)
            return flavor::scalene;

        throw std::domain_error("");
    }
}

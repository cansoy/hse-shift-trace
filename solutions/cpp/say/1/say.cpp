#include "say.h"

namespace say {

std::string under_100(int number) {
    const std::vector<std::string> small{
        "zero", "one", "two", "three", "four",
        "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen",
        "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
    };

    const std::vector<std::string> tens{
        "", "", "twenty", "thirty", "forty",
        "fifty", "sixty", "seventy", "eighty", "ninety"
    };

    if (number < 20) {
        return small[number];
    }

    int ten_part = number / 10;
    int one_part = number % 10;

    if (one_part == 0) {
        return tens[ten_part];
    }

    return tens[ten_part] + "-" + small[one_part];
}

std::string under_1000(int number) {
    if (number < 100) {
        return under_100(number);
    }

    int hundred_part = number / 100;
    int rest = number % 100;

    std::string result = under_100(hundred_part) + " hundred";

    if (rest != 0) {
        result += " " + under_100(rest);
    }

    return result;
}

std::string in_english(std::int64_t number) {
    if (number < 0 || number > 999'999'999'999) {
        throw std::domain_error("number out of range");
    }

    if (number == 0) {
        return "zero";
    }

    const std::vector<std::string> scales{
        "", "thousand", "million", "billion"
    };

    std::vector<std::string> parts;
    int scale_index = 0;

    while (number > 0) {
        int chunk = number % 1000;

        if (chunk != 0) {
            std::string chunk_words = under_1000(chunk);

            if (!scales[scale_index].empty()) {
                chunk_words += " " + scales[scale_index];
            }

            parts.push_back(chunk_words);
        }

        number /= 1000;
        ++scale_index;
    }

    std::reverse(parts.begin(), parts.end());

    std::string result = parts[0];

    for (std::size_t i = 1; i < parts.size(); ++i) {
        result += " " + parts[i];
    }

    return result;
}

}  // namespace say

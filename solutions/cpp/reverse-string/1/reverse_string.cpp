#include "reverse_string.h"

namespace reverse_string {

std::string reverse_string(const std::string &str){
    std::string cpy_str{str};
    std::reverse(cpy_str.begin(),cpy_str.end());
    return cpy_str;
}

}  // namespace reverse_string

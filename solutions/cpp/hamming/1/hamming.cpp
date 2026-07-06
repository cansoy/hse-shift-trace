#include "hamming.h"

namespace hamming {

int compute(const std::string&str_1,const std::string &str_2){
    if(str_1.size()!=str_2.size())
        throw std::domain_error("not equal !");
    
    if(str_1.empty() && str_2.empty() ) return 0;

    int hamming{0};
    for(std::size_t i=0;i<str_1.size();++i){
        if(str_1[i]!=str_2[i]) hamming++;
    }

    return hamming;
}

}  // namespace hamming

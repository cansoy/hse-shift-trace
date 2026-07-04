#include "pangram.h"

namespace pangram {

    bool is_pangram(const std::string& str){
        
        std::string just_alpha_str{};
        for(char ch:str){
            if(std::isalpha(ch)) just_alpha_str.push_back(ch);
        }
        std::transform(just_alpha_str.begin(),just_alpha_str.end(),just_alpha_str.begin(),
                        [](unsigned char ch){
                            return std::tolower(ch);
                        });
        std::sort(just_alpha_str.begin(),just_alpha_str.end());
        auto new_end=std::unique(just_alpha_str.begin(),just_alpha_str.end());
        just_alpha_str.erase(new_end,just_alpha_str.end());

        return just_alpha_str.size()==26;   
    }

}  // namespace pangram

#include "nucleotide_count.h"

namespace nucleotide_count {

    std::map<char,int>count(const std::string &str){
        if(str.empty()) 
            return std::map<char,int>{{'A',0},{'C',0},{'G',0},{'T',0}};
        
        for(char ch:str){
            if(ch=='A' || ch=='C' || ch=='G' || ch=='T'){
            }
            else{
                throw std::invalid_argument("Invalid DNA !");
            };
        }
        
        std::map<char,int>count_nuc{{'A',0},{'C',0},{'G',0},{'T',0}};
        for(char ch:str)
            count_nuc[ch]++;

        return count_nuc;
    }

}  

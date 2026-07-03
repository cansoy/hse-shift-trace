#include "grains.h"

namespace grains {
    
    unsigned long long square(unsigned int num){
       return 1ULL<<(num-1);
    }

     unsigned long long total(){
        unsigned long long sum_total{0};
        for(unsigned int i=0;i<64;i++){
             sum_total+=1ULL<<i;
        }
         return sum_total;
     }
    
}  // namespace grains

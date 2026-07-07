#include "collatz_conjecture.h"

namespace collatz_conjecture {

    int steps(int num){
        if(num<=0) throw std::domain_error("Negative Number !");
        
        int step{0};
        while(num!=1){
            step++;
            if(num%2==0)
                num=num/2;  
            else
                num=3*num+1;
        }
        
        return step;
    } 

} 

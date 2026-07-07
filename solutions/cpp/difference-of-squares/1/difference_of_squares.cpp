#include "difference_of_squares.h"

namespace difference_of_squares {

    std::size_t  square_of_sum(std::size_t num){
        std::size_t  sum{0};
        for(size_t i=1 ;i<=num;++i){
            sum+=i;
        }
        return std::pow(sum,2);
    }
    
    std::size_t  sum_of_squares(std::size_t num){
        std::size_t  sum_squares{0};
        for(size_t i=1;i<=num;++i){
            sum_squares+=pow(i,2);
        }
        return sum_squares;
    }
    
    std::size_t  difference(std::size_t num){
        std::size_t  squareOfSum=square_of_sum(num);
        std::size_t  sumOfSquares=sum_of_squares(num);
        return squareOfSum-sumOfSquares;
    }

}  

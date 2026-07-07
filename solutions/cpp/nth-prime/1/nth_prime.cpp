#include "nth_prime.h"

namespace nth_prime {
    
    bool is_prime(int number)
    {
        if (number < 2)
            return false;
        
        for (int divisor = 2; divisor * divisor <= number; ++divisor)
        {
            if (number % divisor == 0)
                return false;
        }
        return true;
    }

    int nth(int num){
        if (num == 0)
            throw std::domain_error("n must be positive");
        
        int count = 0;
        int candidate = 1; 
        while (count < num)
        {
            ++candidate;
            if (is_prime(candidate))
            {
                ++count;
            }
        }
        return candidate;
    }
    
}  // namespace nth_prime

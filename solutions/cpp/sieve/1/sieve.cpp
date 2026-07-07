#include "sieve.h"

namespace sieve {

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

    std::vector<int>primes(int num){
        std::vector<int> prime_numbers{};
        int count = 0;
        while(count<num){
            if(is_prime(num)){
                prime_numbers.push_back(num);
            }
            --num;
        }
        
        std::sort(prime_numbers.begin(),prime_numbers.end());
        return prime_numbers;
    }
} 

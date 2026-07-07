#pragma once

#include <iostream>
#include <utility>
#include <vector>

namespace queen_attack {
    
    class chess_board{
    
        private:
            std::pair<int,int>white_queen{2,2};
            std::pair<int,int>black_queen{0,3};
    
        public:
            chess_board(std::pair<int,int>,std::pair<int,int>);
            std::pair<int,int>white() const;
            std::pair<int,int>black() const;
            bool can_attack() const;
    };

}  

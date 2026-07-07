#include "queen_attack.h"

namespace queen_attack {

    chess_board::chess_board(std::pair<int,int> white,std::pair<int,int> black):
        white_queen{white},
        black_queen{black}
    {
        std::vector<int>coords{};
        coords.push_back(white_queen.first);
        coords.push_back(white_queen.second);
        coords.push_back(black_queen.first);
        coords.push_back(black_queen.second);
        for(int it:coords){
           if(it<0 || it>7 ) 
               throw std::domain_error("Invalid Coords !"); 
        }
        
        if(white_queen.first==black_queen.first && white_queen.second==black_queen.second)
            throw std::domain_error("Invalid Coords !"); 
    }
    
    std::pair<int,int> chess_board::white() const{
        return white_queen;
    }
    
    std::pair<int,int> chess_board::black() const{
        return black_queen;  
    }
    
    bool chess_board::can_attack() const{
        int row_difference = std::abs(white_queen.first - black_queen.first);
        int column_difference = std::abs(white_queen.second - black_queen.second);
    
        bool same_row = white_queen.first == black_queen.first;
        bool same_column = white_queen.second == black_queen.second;
        bool same_diagonal = row_difference == column_difference;
    
        return same_row || same_column || same_diagonal;
    }
    

}  
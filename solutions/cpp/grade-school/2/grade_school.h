#pragma once

#include <iostream>
#include <string>
#include <vector>
#include <map>
#include <algorithm>

namespace grade_school {
    class school{
        private:
            std::map<int,std::vector<std::string>> grade_students{};
        public:
            school();
            void add(const std::string&,int);
            std::map<int,std::vector<std::string>>roster() const;
            std::vector<std::string>grade(int) const ;
    };
} 

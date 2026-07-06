#include "grade_school.h"

namespace grade_school {
    
    school::school(){
        grade_students.clear();
    };

    void school::add(const std::string &name,int id){
        for(auto &&it:grade_students){
            auto exist_name=find(it.second.begin(),it.second.end(),name);
            if(exist_name!=it.second.end()) throw std::domain_error("exist name!");
        }
        grade_students[id].push_back(name); 
        for(auto &&it:grade_students){                   
            std::sort(it.second.begin(),it.second.end());
        }
    };
    
    std::map<int,std::vector<std::string>> school::roster() const {
        return grade_students;
    }

    std::vector<std::string> school::grade(int id) const{
        auto it=grade_students.find(id);
        if(it!=grade_students.end()){
           return it->second;
        }
        return std::vector<std::string>{};
    }
    
}  

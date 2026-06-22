#include "lasagna_master.h"

namespace lasagna_master {
    
int preparationTime(std::vector<std::string> layers,int avgTime){
    return layers.size()*avgTime;
}

amount quantities(std::vector<std::string> items){
    amount amount_needed{};
    for(auto &&it:items){
        if(it=="noodles"){
            amount_needed.noodles+=50;
        }
        else if(it=="sauce"){
            amount_needed.sauce+=0.2;
        }
    }
    return amount_needed;
}

void addSecretIngredient(std::vector<std::string> &myList,
                        const std::vector<std::string> &friendsList){
    std::string secretIngredient=friendsList.back();
    myList[myList.size()-1]=secretIngredient;
}

void addSecretIngredient(std::vector<std::string> &myList,
                        std::string secretIngredient){
    myList.pop_back();
    myList.push_back(secretIngredient);
}

std::vector<double> scaleRecipe(const std::vector<double> &quantities,int portions){
    std::vector<double> scaledRecipe{};
    double dbl_portions=portions/2.0;
    for(double it:quantities){
        scaledRecipe.push_back(it*dbl_portions);
    }
    return scaledRecipe;
}
 
}  // namespace lasagna_master

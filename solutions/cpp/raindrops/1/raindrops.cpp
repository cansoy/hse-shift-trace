#include "raindrops.h"

namespace raindrops {

std::string convert(int num){
    bool mod_3{num%3==0};
    bool mod_5{num%5==0};
    bool mod_7{num%7==0};
    bool mod_15{num%15==0};
    bool mod_21{num%21==0};
    bool mod_35{num%35==0};
    bool mod_105{num%105==0};
    
    if(mod_105)
        return "PlingPlangPlong";
    else if(mod_35)
        return "PlangPlong";
    else if(mod_21)
        return "PlingPlong";
    else if(mod_15)
        return "PlingPlang";
    else if(mod_7)
        return "Plong";
    else if(mod_5)
        return "Plang";
    else if(mod_3)
        return "Pling";

    return std::to_string(num);
}

}  // namespace raindrops

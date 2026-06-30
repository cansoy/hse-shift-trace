#include "power_of_troy.h"

namespace troy {
    
    void give_new_artifact(human &h, std::string &name){
        artifact user{name};
        h.possession = std::make_unique<artifact>(user);
    }
    
    void exchange_artifacts(std::unique_ptr<artifact> &first,
                        std::unique_ptr<artifact> &second){
        auto first_swap=move(first);
        auto second_swap=move(second);
        first=move(second_swap);
        second=move(first_swap);
    }

    void manifest_power(human &hmn ,std::string name){
        power user{name};
        hmn.own_power=std::make_shared<power>(user);
    }
    
    void use_power(human &influencer,human&influenced){
        influenced.influenced_by=influencer.own_power;
    }

    size_t power_intensity(human& owner_name){
        return owner_name.own_power.use_count();
    }    
}  // namespace troy

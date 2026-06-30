#pragma once

#include <iostream>
#include <string>
#include <memory>

namespace troy {

struct artifact {
    std::string name;
};

struct power {
    std::string effect;
};

struct human{
    std::unique_ptr<artifact> possession{nullptr};
    std::shared_ptr<power>own_power{nullptr};
    std::shared_ptr<power>influenced_by{nullptr};
};

void give_new_artifact(human& h,std::string &name);

void exchange_artifacts(std::unique_ptr<artifact> &first,
                        std::unique_ptr<artifact> &second);
void manifest_power(human&,std::string);

void use_power(human &,human&);

size_t power_intensity(human&);
    
}  // namespace troy

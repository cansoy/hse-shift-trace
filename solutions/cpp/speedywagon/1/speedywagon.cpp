#include "speedywagon.h"

namespace speedywagon {

bool connection_check(pillar_men_sensor* sensor){
    return sensor!=nullptr;
}

int activity_counter(pillar_men_sensor *sensor_array,size_t arr_len){
    int total_activity{0};
    for(size_t i=0;i<arr_len;i++){
        total_activity+=sensor_array[i].activity;
    }
    return total_activity;
}

bool alarm_control(pillar_men_sensor* db){
    if(db==nullptr){
        return false;
    }
    return db->activity>0;
}
    
bool uv_alarm(pillar_men_sensor* sensor){
    if(sensor==nullptr) return false;
    int uvLightHeuristic=uv_light_heuristic(&sensor->data);
    return uvLightHeuristic>sensor->activity;
}

// Please don't change the interface of the uv_light_heuristic function
int uv_light_heuristic(std::vector<int>* data_array) {
    double avg{};
    for (auto element : *data_array) {
        avg += element;
    }
    avg /= data_array->size();
    int uv_index{};
    for (auto element : *data_array) {
        if (element > avg) ++uv_index;
    }
    return uv_index;
}

}  // namespace speedywagon

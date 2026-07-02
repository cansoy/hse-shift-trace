#include "leap.h"

namespace leap {

bool is_leap_year(const int &year){
    if(year%4 ==0 && year%100==0 && year%400==0){
        return true;
    }
    else if(year%4 ==0 && year%100==0 && year%400!=0){
        return false;
    }
    else if(year%4 ==0 && year%100!=0 && year%400!=0){
        return true;
    }
    return false;
}

}  // namespace leap

/*MAKE A TABLE TO SEE ALL RESULT AT ONCE !!!
| Situation                           | Result   |
| ----------------------------------- | -------- |
| Divisible by 4 only                 | leap     |
| Divisible by 4 and 100, but not 400 | not leap |
| Divisible by 4, 100, and 400        | leap     |
| Not divisible by 4                  | not leap |
*/

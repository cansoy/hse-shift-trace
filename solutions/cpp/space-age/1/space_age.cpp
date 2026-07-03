#include "space_age.h"

namespace
{
    constexpr double YEAR_TO_SECOND{31557600.0};
    
    constexpr double CONST_earth{1.0};
    constexpr double CONST_mercury{0.2408467};
    constexpr double CONST_venus{0.61519726};
    constexpr double CONST_mars{1.8808158};
    constexpr double CONST_jupiter{11.862615};
    constexpr double CONST_saturn{29.447498};
    constexpr double CONST_uranus{84.016846};
    constexpr double CONST_neptune{164.79132};
}

namespace space_age
{
    double space_age::seconds ()const
    {
        return second;
    }

    double space_age::on_earth  ()const
    {
        return (second / YEAR_TO_SECOND) / CONST_earth;
    }

    double space_age::on_mercury  ()const
    {
        return (second / YEAR_TO_SECOND) / CONST_mercury ;
    }

    double space_age::on_venus ()const
    {
        return (second / YEAR_TO_SECOND) / CONST_venus;
    }

    double space_age::on_mars ()const
    {
        return (second / YEAR_TO_SECOND) / CONST_mars;
    }

    double space_age::on_jupiter ()const
    {
        return (second / YEAR_TO_SECOND) / CONST_jupiter;
    }

    double space_age::on_saturn ()const
    {
        return (second / YEAR_TO_SECOND) / CONST_saturn;
    }

    double space_age::on_uranus ()const
    {
        return (second / YEAR_TO_SECOND) / CONST_uranus;
    }

    double space_age::on_neptune ()const
    {
        return (second / YEAR_TO_SECOND) / CONST_neptune;
    }
}
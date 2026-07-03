#include "space_age.h"

namespace
{
    constexpr double EARTH_YEAR_SECONDS{31557600.0};
    
    constexpr double CONST_earth{1.0};
    
    constexpr double MERCURY_ORBITAL_PERIOD{0.2408467};
    constexpr double VENUS_ORBITAL_PERIOD{0.61519726};
    constexpr double MARS_ORBITAL_PERIOD{1.8808158};
    constexpr double JUPITER_ORBITAL_PERIOD{11.862615};
    constexpr double SATURN_ORBITAL_PERIOD{29.447498};
    constexpr double URANUS_ORBITAL_PERIOD{84.016846};
    constexpr double NEPTUNE_ORBITAL_PERIOD{164.79132};
}

namespace space_age
{
    double space_age::seconds ()const
    {
        return second;
    }

    double space_age::on_earth  ()const
    {
        return (second / EARTH_YEAR_SECONDS) / CONST_earth;
    }

    double space_age::on_mercury  ()const
    {
        return on_earth() / MERCURY_ORBITAL_PERIOD ;
    }

    double space_age::on_venus ()const
    {
        return on_earth() / VENUS_ORBITAL_PERIOD;
    }

    double space_age::on_mars ()const
    {
        return on_earth() / MARS_ORBITAL_PERIOD;
    }

    double space_age::on_jupiter ()const
    {
        return on_earth() / JUPITER_ORBITAL_PERIOD;
    }

    double space_age::on_saturn ()const
    {
        return on_earth() / SATURN_ORBITAL_PERIOD;
    }

    double space_age::on_uranus ()const
    {
        return on_earth() / URANUS_ORBITAL_PERIOD;
    }

    double space_age::on_neptune ()const
    {
        return on_earth() / NEPTUNE_ORBITAL_PERIOD;
    }
}
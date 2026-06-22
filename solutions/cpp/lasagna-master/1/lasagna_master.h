#pragma once
#include <iostream>
#include <string>
#include <vector>

namespace lasagna_master {

struct amount {
    int noodles;
    double sauce;
};
    
int preparationTime(std::vector<std::string> layers,
                    int avgTime=2);
    
amount quantities(std::vector<std::string> items);

void addSecretIngredient(std::vector<std::string>&myList,
                        const std::vector<std::string>&friendsList);
    
void addSecretIngredient(std::vector<std::string> &myList,
                        std::string secretIngredient);
    
std::vector<double> scaleRecipe(const std::vector<double> &quantities,int portions);

    
}  // namespace lasagna_master
/*
    to make it more professional use cmake
    for ubuntu checkout system requirements:
        make     --version
        cmake     --version
    ------------------------------------------------------
    CMakeLists.txt (recipe of cmake)
    cmake_minimum_required(VERSION 3.20)
    project(lasagna_master_prj)
    set(CMAKE_CXX_STANDART 20)
    set(CMAKE_CXX_STANDART_REQUIRED ON)
    add_executable(
        lasagna_master
        main.cpp
        src/lasagna_master.cpp
    )
    target_include_directories(
        lasagna_master
        PRIVATE
        include
    )
    ------------------------------------------------------
    run commands as below
    cmake -S . -B build
    cmake --build build
    ./build/lasagna_master
    ------------------------------------------------------
    to activate debug for cmake for vscode
    >CMake : Select a Kit =>give priority vscode itself
    >CMake : Build
    >CMake : Debug

*/

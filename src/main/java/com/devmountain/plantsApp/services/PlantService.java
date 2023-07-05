package com.devmountain.plantsApp.services;

import com.devmountain.plantsApp.dtos.PlantDto;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public interface PlantService {
    //adding a plant
    @Transactional
    void addPlant(PlantDto plantDto, Long userId);

    //deleting a plant
    @Transactional
    void deletePlantById(Long plantId);

    //updating a plant
    @Transactional
    void updatePlantById(PlantDto plantDto);

    //finding all plants
    List<PlantDto> getAllPlantsByUserId(Long userId);

    //getting a plant by id
    Optional<PlantDto> getPlantById(Long plantId);
}

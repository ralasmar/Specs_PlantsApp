package com.devmountain.plantsApp.services;

import com.devmountain.plantsApp.dtos.PlantDto;
import com.devmountain.plantsApp.entities.Plant;
import com.devmountain.plantsApp.entities.User;
import com.devmountain.plantsApp.repositories.PlantRepository;
import com.devmountain.plantsApp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlantServiceImpl implements PlantService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PlantRepository plantRepository;

    //adding a plant
    @Override
    @Transactional
    public void addPlant(PlantDto plantDto, Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        Plant plant = new Plant(plantDto);
        userOptional.ifPresent(plant::setUser);
        plantRepository.saveAndFlush(plant);
    }
    //deleting a plant
    @Override
    @Transactional
    public void deletePlantById(Long plantId){
        Optional<Plant> plantOptional = plantRepository.findById((plantId));
        plantOptional.ifPresent(plant -> plantRepository.delete(plant));
    }
    //updating a plant
    @Override
    @Transactional
    public void updatePlantById(PlantDto plantDto){
        Optional<Plant> plantOptional = plantRepository.findById(plantDto.getId());
        plantOptional.ifPresent(plant -> {
            plant.setPlantName(plantDto.getPlantName());
            plant.setPlantNotes(plantDto.getPlantNotes());
            plant.setPhotoUrl(plantDto.getPhotoUrl());
            plantRepository.saveAndFlush(plant);
        });
    }
    //finding all plants
    @Override
    public List<PlantDto> getAllPlantsByUserId(Long userId){
        Optional<User> userOptional = userRepository.findById(userId);
        if(userOptional.isPresent()){
            List<Plant> plantList = plantRepository.findAllByUserEquals(userOptional.get());
            return plantList.stream().map(plant -> new PlantDto(plant)).collect(Collectors.toList());
        }
        return Collections.emptyList();
    }
    //getting a plant by id
    @Override
    public Optional<PlantDto> getPlantById(Long plantId){
        Optional<Plant> plantOptional = plantRepository.findById(plantId);
        if(plantOptional.isPresent()){
            return Optional.of(new PlantDto((plantOptional.get())));
        }
        return Optional.empty();
    }
}

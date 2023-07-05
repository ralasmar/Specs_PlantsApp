package com.devmountain.plantsApp.controllers;

import com.devmountain.plantsApp.dtos.PlantDto;
import com.devmountain.plantsApp.entities.Plant;
import com.devmountain.plantsApp.services.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/plants")
public class PlantController {
    @Autowired
    private PlantService plantService;

    //get all plants by user
    @GetMapping("/user/{userId}")
    public List<PlantDto> getPlantsByUser(@PathVariable Long userId){
        return plantService.getAllPlantsByUserId(userId);
    }
    //add a new plant
    @PostMapping("/user/{userId}")
    public void addPlant(@RequestBody PlantDto plantDto, @PathVariable Long userId){
        plantService.addPlant(plantDto, userId);
    }
    //delete a plant
    @DeleteMapping("/{plantId}")
    public void deletePlantById(@PathVariable Long plantId){
        plantService.deletePlantById(plantId);
    }
    //update an existing plant
    @PutMapping
    public void updatePlant(@RequestBody PlantDto plantDto){
        plantService.updatePlantById(plantDto);
    }
    //get a note by plant id
    @GetMapping("/{plantId}")
    public Optional<PlantDto> getPlantById(@PathVariable Long plantId){
        return plantService.getPlantById(plantId);
    }
}

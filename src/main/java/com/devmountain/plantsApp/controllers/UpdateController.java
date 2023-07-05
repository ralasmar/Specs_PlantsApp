package com.devmountain.plantsApp.controllers;

import com.devmountain.plantsApp.dtos.UpdateDto;
import com.devmountain.plantsApp.services.UpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/updates")
public class UpdateController {
    @Autowired
    private UpdateService updateService;

    //get all updates by plant
    @GetMapping("/plant/{plantId}")
    public List<UpdateDto> getUpdatesByPlant(@PathVariable Long plantId){
        return updateService.getAllUpdatesByPlantId(plantId);
    }
    //add a new update
    @PostMapping("/plant/{plantId}")
    public void addPlant(@RequestBody UpdateDto updateDto, @PathVariable Long plantId){
        updateService.addUpdate(updateDto, plantId);
    }
    //delete an update
    @DeleteMapping("/{updateId}")
    public void deleteUpdateById(@PathVariable Long updateId){
        updateService.deleteUpdateById(updateId);
    }
    //edit an update
    @PutMapping
    public void editUpdate(@RequestBody UpdateDto updateDto){
        updateService.EditUpdateById(updateDto);
    }
    //get an update by update id
    @GetMapping("/{updateId}")
    public Optional<UpdateDto> getUpdateById(@PathVariable Long updateId){
        return updateService.getUpdateById(updateId);
    }
}

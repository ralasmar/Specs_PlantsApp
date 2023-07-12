package com.devmountain.plantsApp.services;

import com.devmountain.plantsApp.dtos.UpdateDto;
import com.devmountain.plantsApp.entities.Plant;
import com.devmountain.plantsApp.entities.Update;
import com.devmountain.plantsApp.repositories.PlantRepository;
import com.devmountain.plantsApp.repositories.UpdateRepository;
import com.devmountain.plantsApp.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UpdateServiceImpl implements UpdateService {
    @Autowired
    private PlantRepository plantRepository;
    @Autowired
    private UpdateRepository updateRepository;

    //adding an update
    @Override
    @Transactional
    public void addUpdate(UpdateDto updateDto, Long plantId){
        Optional<Plant> plantOptional = plantRepository.findById(plantId);
        Update update = new Update(updateDto);
        plantOptional.ifPresent(update::setPlant);
        updateRepository.saveAndFlush(update);
    }
    //deleting an update
    @Override
    @Transactional
    public void deleteUpdateById(Long updateId){
        Optional<Update> updateOptional = updateRepository.findById(updateId);
        updateOptional.ifPresent(update -> updateRepository.delete(update));
    }
    //editing an update
    @Override
    @Transactional
    public void EditUpdateById(UpdateDto updateDto){
        Optional<Update> updateOptional = updateRepository.findById(updateDto.getId());
        updateOptional.ifPresent(update -> {
            update.setUpdateBody(updateDto.getUpdateBody());
            updateRepository.saveAndFlush(update);
        });
    }

    //find all updates by plantId
    @Override
    public List<UpdateDto> getAllUpdatesByPlantId(Long plantId) {
        Optional<Plant> plantOptional = plantRepository.findById(plantId);
        System.out.println(plantId);
        if (plantOptional.isPresent()) {
            Plant plant = plantOptional.get();
            Set<Update> updates = plant.getUpdateSet();
            System.out.println(updates);
            return updates.stream()
                    .map(UpdateDto::new)
                    .collect(Collectors.toList());
        } else {
            System.out.print("error getting updates");
            return null;
        }
    }

//        Optional<Plant> plantOptional = plantRepository.findById(plantId);
//        if(plantOptional.isPresent()){
//            List<Update> updateList = updateRepository.findAllByPlantEquals(plantOptional.get());
//            Optional<Object> plantList;
//            return updateList.stream().map(update -> new UpdateDto(update)).collect(Collectors.toList());
//        }
//        return Collections.emptyList();
    //getting an update by id
    @Override
    public Optional<UpdateDto> getUpdateById(Long updateId){
        Optional<Update> updateOptional = updateRepository.findById(updateId);
        if(updateOptional.isPresent()){
            return Optional.of(new UpdateDto(updateOptional.get()));
        }
        return Optional.empty();
    }

}

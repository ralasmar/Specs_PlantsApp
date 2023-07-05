package com.devmountain.plantsApp.services;

import com.devmountain.plantsApp.dtos.UpdateDto;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public interface UpdateService {
    //adding an update
    @Transactional
    void addUpdate(UpdateDto updateDto, Long plantId);

    //deleting an update
    @Transactional
    void deleteUpdateById(Long updateId);

    //editing an update
    @Transactional
    void EditUpdateById(UpdateDto updateDto);

    //find all updates by plantId
    List<UpdateDto> getAllUpdatesByPlantId(Long plantId);

    //getting an update by id
    Optional<UpdateDto> getUpdateById(Long updateId);
}

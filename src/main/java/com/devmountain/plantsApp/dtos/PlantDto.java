package com.devmountain.plantsApp.dtos;
import com.devmountain.plantsApp.entities.Plant;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlantDto implements Serializable {
    private long id;
    private String plantName;
    private String plantNotes;
    private String photoUrl;
    private UserDto userDto;
    private Set<UpdateDto> updateDtoSet = new HashSet<>();

    public PlantDto(Plant plant){
        if(plant.getId() != null){
            this.id = plant.getId();
        }
        if(plant.getPlantName() != null){
            this.plantName = plant.getPlantName();
        }
        if(plant.getPlantNotes() != null){
            this.plantNotes = plant.getPlantNotes();
        }
        if(plant.getPhotoUrl() != null){
            this.photoUrl = plant.getPhotoUrl();
        }
    }
}

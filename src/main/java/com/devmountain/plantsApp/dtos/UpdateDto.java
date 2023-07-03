package com.devmountain.plantsApp.dtos;

import com.devmountain.plantsApp.entities.Update;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateDto implements Serializable {
    private Long id;
    private String updateBody;
    private String date;
    private Boolean isHealthy;
    private PlantDto plantDto;

    public UpdateDto(Update update){
        if(update.getId() != null){
            this.id = update.getId();
        }
        if(update.getUpdateBody() != null){
            this.updateBody = update.getUpdateBody();
        }
        if(update.getDate() != null){
            this.date = update.getDate();
        }
        if(update.getIsHealthy() != null){
            this.isHealthy = update.getIsHealthy();
        }

    }
}

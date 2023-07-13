package com.devmountain.plantsApp.entities;

import com.devmountain.plantsApp.dtos.UpdateDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Updates")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Update {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String updateBody;

    @Column
    private String date;

    @Column
    private String isHealthy;

    @ManyToOne
    @JsonBackReference
    private Plant plant;

    public Update(UpdateDto updateDto){
        if(updateDto.getUpdateBody() != null){
            this.updateBody = updateDto.getUpdateBody();
        }
        if(updateDto.getDate() != null){
            this.date = updateDto.getDate();
        }
        if(updateDto.getIsHealthy() != null){
            this.isHealthy = updateDto.getIsHealthy();
        }

    }
}

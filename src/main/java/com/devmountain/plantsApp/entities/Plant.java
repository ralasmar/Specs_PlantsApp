package com.devmountain.plantsApp.entities;

import com.devmountain.plantsApp.dtos.PlantDto;
import com.devmountain.plantsApp.dtos.UserDto;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="Plants")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Plant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String plantName;

    @Column(columnDefinition = "text")
    private String plantNotes;

    @Column(columnDefinition = "text")
    private String photoUrl;

    @ManyToOne
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "plant", fetch= FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.PERSIST})
    @JsonManagedReference
   private Set<Update> updateSet = new HashSet<>();

    public Plant(PlantDto plantDto){
        if(plantDto.getPlantName() != null){
            this.plantName = plantDto.getPlantName();
        }
        if(plantDto.getPlantNotes() != null){
            this.plantNotes = plantDto.getPlantNotes();
        }
        if(plantDto.getPhotoUrl() != null){
            this.photoUrl = plantDto.getPhotoUrl();
        }
    }
    public Plant(PlantDto plantDto, Set<Update> updateSet) {
        this(plantDto);
        this.updateSet = updateSet;
    }
}

package com.devmountain.plantsApp.repositories;

import com.devmountain.plantsApp.entities.Plant;
import com.devmountain.plantsApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findAllByUserEquals(User user);

}

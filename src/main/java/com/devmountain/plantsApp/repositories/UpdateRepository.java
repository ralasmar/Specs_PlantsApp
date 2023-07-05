package com.devmountain.plantsApp.repositories;

import com.devmountain.plantsApp.entities.Plant;
import com.devmountain.plantsApp.entities.Update;
import com.devmountain.plantsApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UpdateRepository extends JpaRepository<Update, Long> {
    List<Update> findAllByUserEquals(Plant plant);
}

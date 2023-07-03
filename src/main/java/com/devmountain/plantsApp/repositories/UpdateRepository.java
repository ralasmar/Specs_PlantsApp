package com.devmountain.plantsApp.repositories;

import com.devmountain.plantsApp.entities.Update;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpdateRepository extends JpaRepository<Update, Long> {
}

package com.ptit.elearningsecurity.repository;

import com.ptit.elearningsecurity.entity.lab.Lab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabRepository extends JpaRepository<Lab, Integer> {

    List<Lab> findTop3ByTag(String tag);
}

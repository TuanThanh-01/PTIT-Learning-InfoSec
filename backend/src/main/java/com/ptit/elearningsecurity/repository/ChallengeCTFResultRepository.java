package com.ptit.elearningsecurity.repository;

import com.ptit.elearningsecurity.entity.User;
import com.ptit.elearningsecurity.entity.labCTF.ChallengeCTF;
import com.ptit.elearningsecurity.entity.labCTF.ChallengeCTFResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeCTFResultRepository extends JpaRepository<ChallengeCTFResult, Integer> {
    List<ChallengeCTFResult> findAllByUser(User user);
    boolean existsByChallengeCTFAndUser(ChallengeCTF challengeCTF, User user);
    Optional<ChallengeCTFResult> findByChallengeCTFAndUser(ChallengeCTF challengeCTF, User user);
}

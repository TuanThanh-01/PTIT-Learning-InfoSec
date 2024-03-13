package com.ptit.elearningsecurity.repository;

import com.ptit.elearningsecurity.data.dto.RankingScoreDTO;
import com.ptit.elearningsecurity.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    @Query(value = "select * from users where role <> 'ADMIN'", nativeQuery = true)
    List<User> findAllUserWithRoleNotEqualAdmin();

    List<User> findTop5ByOrderByScoredChallengeCTFDesc();

    @Query(value = "SELECT u.studentIdentity as studentIdentity, u.scored_challenge_ctf as score, " +
            "u.firstname as firstname, u.lastname as lastname, " +
            "r.total_try as totalTry, r.total_correct as totalCorrect, h.total_submit as totalSubmit " +
            "FROM users u " +
            "LEFT JOIN (" +
            "   SELECT user_id, " +
            "          COUNT(id) as total_try, " +
            "          SUM(CASE isCompleted WHEN true THEN 1 ELSE 0 END) as total_correct " +
            "   FROM challengectfresult " +
            "   GROUP BY user_id " +
            ") r ON r.user_id = u.id " +
            "LEFT JOIN (" +
            "   SELECT user_id, " +
            "          COUNT(id) as total_submit " +
            "   FROM historysubmitchallengectf " +
            "   GROUP BY user_id " +
            ") h ON h.user_id = u.id " +
            "WHERE u.role <> 'ADMIN' " +
            "ORDER BY score DESC ", nativeQuery = true)
    List<Object[]> findRankingUserChallengeCTF();
}

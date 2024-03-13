package com.ptit.elearningsecurity.repository;

import com.ptit.elearningsecurity.data.dto.*;
import com.ptit.elearningsecurity.entity.labCTF.ChallengeCTF;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChallengeCTFRepository extends JpaRepository<ChallengeCTF, Integer> {

    @Query(value = "SELECT c.* FROM ChallengeCTF c " +
            "inner join ChallengeCTFResult r " +
            "on c.id = r.challenge_ctf_id) " +
            "where c.user_id = :user_id", nativeQuery = true)
    List<ChallengeCTF> findAllChallengeCTFResolvedByUser(@Param("user_id") Integer userId);

    @Query(value = "SELECT * FROM challengectf ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<ChallengeCTF> findRandomChallengeCTF();
    @Query("SELECT NEW com.ptit.elearningsecurity.data.dto.ChallengeCTFResponseDTO(c.id, c.title, c.content, " +
            "c.level, c.tag, c.hint, c.flag, c.point, c.urlFile, c.totalSolve, c.createdAt, c.updatedAt, r.isCompleted) " +
            "FROM ChallengeCTF c " +
            "LEFT JOIN ChallengeCTFResult r " +
            "ON c.id = r.challengeCTF.id " +
            "AND r.user.id = :user_id")
    List<ChallengeCTFResponseDTO> findAllChallengeCTFResponseDTOByUser(@Param("user_id") Integer userId);

    @Query("SELECT NEW com.ptit.elearningsecurity.data.dto.TotalTagChallengeDTO(c.tag, COUNT(c)) " +
            "FROM ChallengeCTF c group by c.tag ")
    List<TotalTagChallengeDTO> findTotalTag();

    @Query("SELECT NEW com.ptit.elearningsecurity.data.dto.TotalTagChallengeDTO(c.tag, " +
            "SUM(CASE WHEN r.isCompleted = true THEN 1 ELSE 0 END)) " +
            "FROM ChallengeCTF c " +
            "LEFT JOIN ChallengeCTFResult r " +
            "ON c.id = r.challengeCTF.id AND r.user.id = :userId " +
            "group by c.tag")
    List<TotalTagChallengeDTO> findTotalChallengeCompletedByTagForUser(@Param("userId") Integer userId);

    @Query("SELECT COUNT(distinct tag) from ChallengeCTF")
    Long getTotalTag();

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.TagTotalCompleteChallengeCTFDTO(c.tag, count(*)) " +
            "FROM ChallengeCTFResult r " +
            "INNER JOIN ChallengeCTF c " +
            "ON c.id = r.challengeCTF.id " +
            "WHERE r.isCompleted = true " +
            "GROUP BY c.tag")
    List<TagTotalCompleteChallengeCTFDTO> findTagTotalCompleteChallengeCTF();

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.TagTotalUnCompleteChallengeCTFDTO(c.tag, " +
            "SUM (CASE WHEN r.isCompleted = false THEN 1 ELSE 0 END )) " +
            "FROM ChallengeCTF c " +
            "LEFT JOIN ChallengeCTFResult r " +
            "ON c.id = r.challengeCTF.id " +
            "GROUP BY c.tag")
    List<TagTotalUnCompleteChallengeCTFDTO> findTagTotalUnCompleteChallengeCTF();

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.TagTotalSubmitChallengeCTFDTO(c.tag, count(*)) " +
            "FROM HistorySubmitChallengeCTF h " +
            "INNER JOIN ChallengeCTF c " +
            "ON c.id = h.challengeCTF.id " +
            "GROUP BY c.tag")
    List<TagTotalSubmitChallengeCTFDTO> findTagTotalSubmitChallengeCTF();



    @Query("SELECT new com.ptit.elearningsecurity.data.dto.TagTotalChallengeCTFDTO(c.tag, count (*)) FROM " +
            "ChallengeCTF c " +
            "GROUP BY c.tag")
    List<TagTotalChallengeCTFDTO> findTagTotalChallengeCTF();

    @Query(value = "SELECT u.id, u.studentIdentity as studentIdentity, u.scored_challenge_ctf as score, " +
            "u.firstname as firstname, u.lastname as lastname, " +
            "r.total_try as totalTry, r.total_correct as totalCorrect, " +
            "r.total_wrong as totalWrong, h.total_submit as totalSubmit " +
            "FROM users u " +
            "LEFT JOIN (" +
            "   SELECT user_id, " +
            "          COUNT(id) as total_try, " +
            "          SUM(CASE isCompleted WHEN true THEN 1 ELSE 0 END) as total_correct, " +
            "          SUM(CASE isCompleted WHEN false THEN 1 ELSE 0 END) as total_wrong " +
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
            "ORDER BY totalTry DESC", nativeQuery = true)
    List<Object[]> findStatisticUserChallengeCTF();

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.UserChallengeCTFDetailDTO(c.title, c.tag, c.level, h.createdAt, h.status) " +
            "FROM ChallengeCTF c " +
            "INNER JOIN HistorySubmitChallengeCTF h " +
            "ON c.id = h.challengeCTF.id " +
            "WHERE h.user.id = :userId " +
            "ORDER BY h.createdAt DESC")
    List<UserChallengeCTFDetailDTO> findUserChallengeCTFDetail(@Param("userId") Integer userId);

    @Query(value = "SELECT c.id, c.title, c.level, c.tag, h.total_submit, r.total_correct, r.total_wrong " +
            "FROM elearning.challengectf c " +
            "LEFT JOIN ( " +
            "   SELECT challenge_ctf_id, " +
            "   SUM(CASE isCompleted WHEN true THEN 1 ELSE 0 END) as total_correct, " +
            "   SUM(CASE isCompleted WHEN false THEN 1 ELSE 0 END) as total_wrong " +
            "   FROM elearning.challengectfresult " +
            "   GROUP BY challenge_ctf_id " +
            ") r ON c.id = r.challenge_ctf_id " +
            "LEFT JOIN ( " +
            "   SELECT challenge_CTF_id, " +
            "   COUNT(id) as total_submit " +
            "   FROM elearning.historysubmitchallengectf " +
            "   GROUP BY challenge_CTF_id " +
            ") h ON c.id = h.challenge_CTF_id", nativeQuery = true)
    List<Object[]> findStatisticChallengeCTF();

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.ChallengeCTFDetailDTO(c.title, c.tag, c.level, h.createdAt, " +
            "h.status, h.user.studentIdentity, h.user.firstname, h.user.lastname) " +
            "FROM ChallengeCTF c " +
            "INNER JOIN HistorySubmitChallengeCTF h " +
            "ON c.id = h.challengeCTF.id " +
            "WHERE c.id = :challengeCTFId " +
            "ORDER BY h.createdAt DESC")
    List<ChallengeCTFDetailDTO> findChallengeCTFDetail(@Param("challengeCTFId") Integer challengeCTFId);
}

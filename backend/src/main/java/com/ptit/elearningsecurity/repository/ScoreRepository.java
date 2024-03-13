package com.ptit.elearningsecurity.repository;

import com.ptit.elearningsecurity.data.dto.QuizCorrectWrongDTO;
import com.ptit.elearningsecurity.data.dto.QuizScoreDTO;
import com.ptit.elearningsecurity.data.dto.QuizTimeCompletionDTO;
import com.ptit.elearningsecurity.data.dto.StatisticUserQuizDTO;
import com.ptit.elearningsecurity.entity.User;
import com.ptit.elearningsecurity.entity.quiz.Quiz;
import com.ptit.elearningsecurity.entity.quiz.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Integer> {
    List<Score> findAllByQuiz(Quiz quiz);
    @Query(value = "SELECT * FROM score WHERE user_id=:userID ORDER BY createdAt DESC ", nativeQuery = true)
    List<Score> findAllByUser(@Param("userID") Integer userID);

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.QuizScoreDTO(s.quiz.name, avg(s.score)) " +
            "FROM Score s " +
            "GROUP BY s.quiz.id")
    List<QuizScoreDTO> findQuizAndAverageScore();

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.QuizTimeCompletionDTO(s.quiz.name, " +
            "cast(SEC_TO_TIME(AVG(TIME_TO_SEC(s.totalCompletionTime))) as string)) " +
            "FROM Score s " +
            "GROUP BY s.quiz.id")
    List<QuizTimeCompletionDTO> findQuizAndAverageTimeCompletion();

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.QuizCorrectWrongDTO(s.quiz.name, " +
            "sum(s.totalCorrectAnswer), sum(s.totalWrongAnswer)) " +
            "FROM Score s " +
            "group by s.quiz.id")
    List<QuizCorrectWrongDTO> findQuizAndCorrectWrongAnswer();

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.StatisticUserQuizDTO(s.user.firstname, s.user.lastname, " +
            "s.user.studentIdentity, s.quiz.name, avg(s.score), avg(s.totalCorrectAnswer), avg(s.totalWrongAnswer), count(s)," +
            "cast(SEC_TO_TIME(AVG(TIME_TO_SEC(s.totalCompletionTime))) as string)) " +
            "FROM Score s " +
            "GROUP BY s.user.id, s.quiz.id " +
            "ORDER BY s.user.id")
    List<StatisticUserQuizDTO> findAllStatisticUserQuiz();
}

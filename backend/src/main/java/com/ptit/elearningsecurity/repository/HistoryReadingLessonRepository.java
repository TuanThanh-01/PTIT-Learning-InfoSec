package com.ptit.elearningsecurity.repository;

import com.ptit.elearningsecurity.data.dto.StatisticUserLessonDetailDTO;
import com.ptit.elearningsecurity.entity.User;
import com.ptit.elearningsecurity.entity.lecture.HistoryReadingLesson;
import com.ptit.elearningsecurity.entity.lecture.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryReadingLessonRepository extends JpaRepository<HistoryReadingLesson, Integer> {
    @Query(value = "SELECT * FROM historyreadinglesson ORDER BY created_at DESC", nativeQuery = true)
    List<HistoryReadingLesson> findAllHistoryLesson();
    List<HistoryReadingLesson> findAllByUser(User user);
    List<HistoryReadingLesson> findAllByLesson(Lesson lesson);

    @Query(value = "SELECT id, created_at, lesson_id, user_id " +
            "FROM ( SELECT id, created_at, lesson_id, user_id, " +
            "ROW_NUMBER() OVER (PARTITION BY lesson_id ORDER BY created_at DESC) AS row_num " +
            "FROM elearning.historyreadinglesson " +
            "WHERE user_id = :userId) AS subquery " +
            "WHERE row_num = 1 " +
            "ORDER BY created_at DESC " +
            "LIMIT 4", nativeQuery = true)
    List<HistoryReadingLesson> findHistoryReadingLessonRecentByUser(@Param("userId") Integer userId);

    @Query(value = "Select userId, firstname, lastname, student_identity, count(lessonId) as total_learn FROM ( " +
            "Select u.id as userId, u.firstname as firstname, u.lastname as lastname, u.studentIdentity as student_identity, h.lesson_id as lessonId, count(h.lesson_id) as total_view " +
            "from users u " +
            "LEFT JOIN historyreadinglesson h ON h.user_id = u.id " +
            "group by h.lesson_id, u.firstname, u.lastname, u.studentIdentity, u.id " +
            ") AS subquery " +
            "group by firstname, lastname, student_identity, userId " +
            "order by total_learn desc", nativeQuery = true)
    List<Object[]> findStatisticUserLesson();

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.StatisticUserLessonDetailDTO(u.firstname, u.lastname, u.studentIdentity, l.title, count (h.lesson.id)) FROM User  u " +
            "LEFT JOIN HistoryReadingLesson h " +
            "ON h.user.id = u.id " +
            "INNER JOIN Lesson l on l.id = h.lesson.id " +
            "WHERE h.user.id = :userId " +
            "GROUP BY h.lesson.id, u.firstname, u.lastname, u.studentIdentity")
    List<StatisticUserLessonDetailDTO> findStatisticUserLessonDetail(@Param("userId") Integer userId);
}

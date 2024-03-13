package com.ptit.elearningsecurity.repository;

import com.ptit.elearningsecurity.data.dto.StatisticLessonDTO;
import com.ptit.elearningsecurity.entity.lecture.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Integer> {
    boolean existsByTitle(String title);
    Optional<Lesson> findByTitle(String title);

    @Query(value = "SELECT * FROM lesson WHERE id <> :lessonId ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<Lesson> findRandomLesson(@Param("lessonId") Integer lessonId);

    @Query("SELECT new com.ptit.elearningsecurity.data.dto.StatisticLessonDTO(l.id, l.title, COUNT (h.lesson.id)) " +
            "FROM Lesson l " +
            "LEFT JOIN HistoryReadingLesson h " +
            "ON l.id = h.lesson.id " +
            "GROUP BY l.id")
    List<StatisticLessonDTO> findAllStatisticLesson();
}

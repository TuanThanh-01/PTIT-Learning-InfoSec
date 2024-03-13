package com.ptit.elearningsecurity.repository;

import com.ptit.elearningsecurity.entity.quiz.Question;
import com.ptit.elearningsecurity.entity.quiz.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findAllByQuiz(Quiz quiz);

}

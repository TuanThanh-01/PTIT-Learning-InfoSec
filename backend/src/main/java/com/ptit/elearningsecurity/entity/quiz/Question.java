package com.ptit.elearningsecurity.entity.quiz;

import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "question_title", columnDefinition = "TEXT")
    private String questionTitle;
    @Column(name = "option1", columnDefinition = "TEXT")
    private String option1;
    @Column(name = "option2", columnDefinition = "TEXT")
    private String option2;
    @Column(name = "option3", columnDefinition = "TEXT")
    private String option3;
    @Column(name = "option4", columnDefinition = "TEXT")
    private String option4;
    @Column(name = "correct_answer", columnDefinition = "TEXT")
    private String correctAnswer;
    private Instant createdAt;
    private Instant updatedAt;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;
}

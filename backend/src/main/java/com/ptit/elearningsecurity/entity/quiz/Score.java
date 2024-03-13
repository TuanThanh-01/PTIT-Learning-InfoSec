package com.ptit.elearningsecurity.entity.quiz;

import com.ptit.elearningsecurity.entity.User;
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
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer score;
    private Instant createdAt;
    private Instant updatedAt;
    @Column(name = "total_completion_time")
    private String totalCompletionTime;
    @Column(name = "total_correct_answer")
    private Integer totalCorrectAnswer;
    @Column(name = "total_wrong_answer")
    private Integer totalWrongAnswer;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

}

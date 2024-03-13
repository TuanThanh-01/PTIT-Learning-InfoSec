package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class StatisticUserQuizDTO {
    private String firstname;
    private String lastname;
    private String studentIdentity;
    private String quizTitle;
    private Double avgScore;
    private Double avgTotalCorrectAnswer;
    private Double avgTotalWrongAnswer;
    private Long totalTry;
    private String timeAvg;

    public StatisticUserQuizDTO(String firstname, String lastname,
                                String studentIdentity, String quizTitle,
                                Double avgScore, Double avgTotalCorrectAnswer,
                                Double avgTotalWrongAnswer, Long totalTry, String timeAvg) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.studentIdentity = studentIdentity;
        this.quizTitle = quizTitle;
        this.avgScore = avgScore;
        this.avgTotalCorrectAnswer = avgTotalCorrectAnswer;
        this.avgTotalWrongAnswer = avgTotalWrongAnswer;
        this.totalTry = totalTry;
        this.timeAvg = timeAvg;
    }
}

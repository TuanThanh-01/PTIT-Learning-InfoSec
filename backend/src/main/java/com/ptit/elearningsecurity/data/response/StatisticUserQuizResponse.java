package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class StatisticUserQuizResponse {
    @JsonProperty("full_name")
    private String username;
    @JsonProperty("student_identity")
    private String studentIdentity;
    @JsonProperty("quiz_title")
    private String quizTitle;
    @JsonProperty("avg_score")
    private Double avgScore;
    @JsonProperty("avg_total_correct_answer")
    private Double avgTotalCorrectAnswer;
    @JsonProperty("avg_total_wrong_answer")
    private Double avgTotalWrongAnswer;
    @JsonProperty("total_try")
    private Long totalTry;
    @JsonProperty("time_avg")
    private String timeAvg;
}

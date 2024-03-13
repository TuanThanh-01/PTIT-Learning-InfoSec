package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class StatisticQuizDTO {
    @JsonProperty("total_quiz")
    private Long totalQuiz;
    @JsonProperty("total_question")
    private Long totalQuestion;
    @JsonProperty("total_solve")
    private Long totalSolve;
}

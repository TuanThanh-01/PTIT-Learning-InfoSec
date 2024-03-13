package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class QuizScoreDTO {
    @JsonProperty("quiz_title")
    private String quizTitle;
    @JsonProperty("avg_value")
    private Double avgValue;

    public QuizScoreDTO(String quizTitle, Double avgValue) {
        this.quizTitle = quizTitle;
        this.avgValue = avgValue;
    }
}

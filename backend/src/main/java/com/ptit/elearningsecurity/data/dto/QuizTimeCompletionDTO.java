package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class QuizTimeCompletionDTO {
    @JsonProperty("quiz_title")
    private String quizTitle;
    @JsonProperty("time_avg")
    private String timeAvg;

    public QuizTimeCompletionDTO(String quizTitle, String timeAvg) {
        this.quizTitle = quizTitle;
        this.timeAvg = timeAvg;
    }
}

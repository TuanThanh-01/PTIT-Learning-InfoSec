package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class QuizTimeCompletionResponse {
    @JsonProperty("quiz_title")
    private String quizTitle;
    @JsonProperty("time_avg")
    private Integer timeAvg;
}

package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class QuizCorrectWrongDTO {
    @JsonProperty("quiz_title")
    private String quizTitle;
    @JsonProperty("total_correct")
    private Long totalCorrect;
    @JsonProperty("total_wrong")
    private Long totalWrong;

    public QuizCorrectWrongDTO(String quizTitle, Long totalCorrect, Long totalWrong) {
        this.quizTitle = quizTitle;
        this.totalCorrect = totalCorrect;
        this.totalWrong = totalWrong;
    }
}

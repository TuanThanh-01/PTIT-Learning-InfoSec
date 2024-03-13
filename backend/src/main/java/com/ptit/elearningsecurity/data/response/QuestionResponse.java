package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class QuestionResponse {
    private Integer id;
    @JsonProperty("question_title")
    private String questionTitle;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    @JsonProperty("correct_answer")
    private String correctAnswer;
    private String quizTitle;
}

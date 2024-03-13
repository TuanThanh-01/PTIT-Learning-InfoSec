package com.ptit.elearningsecurity.data.request;

import lombok.Data;
import lombok.experimental.Accessors;

import javax.persistence.Column;

@Data
@Accessors(chain = true)
public class ScoreRequest {
    private Integer score;
    private Integer userId;
    private String quizTitle;
    private String totalCompletionTime;
    private Integer totalCorrectAnswer;
    private Integer totalWrongAnswer;
}

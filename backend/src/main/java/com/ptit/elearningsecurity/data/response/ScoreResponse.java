package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class ScoreResponse {
    private Long id;
    private Integer score;
    @JsonProperty("created_at")
    private Instant createdAt;
    @JsonProperty("updated_at")
    private Instant updatedAt;
    @JsonProperty("total_completion_time")
    private String totalCompletionTime;
    @JsonProperty("total_correct_answer")
    private Integer totalCorrectAnswer;
    @JsonProperty("total_wrong_answer")
    private Integer totalWrongAnswer;
    @JsonProperty("user")
    private UserResponse userResponse;
    @JsonProperty("quiz")
    private QuizResponse quizResponse;
}

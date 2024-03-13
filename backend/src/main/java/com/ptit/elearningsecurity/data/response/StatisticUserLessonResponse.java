package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.math.BigInteger;

@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class StatisticUserLessonResponse {
    @JsonProperty("user_id")
    private Integer userId;
    private String username;
    @JsonProperty("student_identity")
    private String studentIdentity;
    @JsonProperty("total_lesson_learn")
    private BigInteger totalLessonLearn;
}

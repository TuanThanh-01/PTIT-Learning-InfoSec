package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.math.BigInteger;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
public class StatisticUserChallengeCTFDTO {
    @JsonProperty("user_id")
    private Integer userId;
    @JsonProperty("student_identity")
    private String studentIdentity;
    private Integer score;
    private String username;
    @JsonProperty("total_try")
    private BigInteger totalTry;
    @JsonProperty("total_correct")
    private BigDecimal totalCorrect;
    @JsonProperty("total_wrong")
    private BigDecimal totalWrong;
    @JsonProperty("total_submit")
    private BigInteger totalSubmit;
}

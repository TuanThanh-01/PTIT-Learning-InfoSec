package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.math.BigInteger;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class StatisticChallengeCTFDTO {
    @JsonProperty("challenge_ctf_id")
    private Integer challengeCTFId;
    private String title;
    private String level;
    private String tag;
    @JsonProperty("total_submit")
    private BigInteger totalSubmit;
    @JsonProperty("total_correct")
    private BigDecimal totalCorrect;
    @JsonProperty("total_wrong")
    private BigDecimal totalWrong;
}

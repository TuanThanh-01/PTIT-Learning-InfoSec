package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class UserStatisticChallengeCTFResponse {
    @JsonProperty("student_identity")
    private String studentIdentity;
    @JsonProperty("user_score")
    private Integer userScore;
    @JsonProperty("percentage_web_exploitation")
    private Integer percentageWebExploitation;
    @JsonProperty("percentage_forensics")
    private Integer percentageForensics;
    @JsonProperty("percentage_binary_exploitation")
    private Integer percentageBinaryExploitation;
    @JsonProperty("percentage_reverse_engineering")
    private Integer percentageReverseEngineering;
    @JsonProperty("percentage_cryptography")
    private Integer percentageCryptography;
    @JsonProperty("percentage_miscellaneous")
    private Integer percentageMiscellaneous;
    @JsonProperty("percentage_all")
    private Integer percentageAll;
}

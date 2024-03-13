package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class StatisticChallengeCTFOverviewDTO {
    @JsonProperty("total_challenge")
    private Long totalChallenge;
    @JsonProperty("total_tag")
    private Long totalTag;
    @JsonProperty("total_submit")
    private Long totalSubmit;
}

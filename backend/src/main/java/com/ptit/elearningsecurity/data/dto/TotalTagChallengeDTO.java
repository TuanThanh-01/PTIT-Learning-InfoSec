package com.ptit.elearningsecurity.data.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TotalTagChallengeDTO {
    private String tag;
    private Long totalChallenge;

    public TotalTagChallengeDTO(String tag, Long totalChallenge) {
        this.tag = tag;
        this.totalChallenge = totalChallenge;
    }
}

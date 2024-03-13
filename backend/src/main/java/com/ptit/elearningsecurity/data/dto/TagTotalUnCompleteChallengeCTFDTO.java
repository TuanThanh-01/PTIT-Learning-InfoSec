package com.ptit.elearningsecurity.data.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TagTotalUnCompleteChallengeCTFDTO {
    private String tag;
    private Long totalUnComplete;

    public TagTotalUnCompleteChallengeCTFDTO(String tag, Long totalUnComplete) {
        this.tag = tag;
        this.totalUnComplete = totalUnComplete;
    }
}

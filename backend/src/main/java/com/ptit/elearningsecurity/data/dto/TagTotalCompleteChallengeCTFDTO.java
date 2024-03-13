package com.ptit.elearningsecurity.data.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TagTotalCompleteChallengeCTFDTO {
    private String tag;
    private Long totalCompleted;

    public TagTotalCompleteChallengeCTFDTO(String tag, Long totalCompleted) {
        this.tag = tag;
        this.totalCompleted = totalCompleted;
    }
}

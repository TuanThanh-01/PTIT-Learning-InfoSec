package com.ptit.elearningsecurity.data.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TagTotalChallengeCTFDTO {
    private String tag;
    private Long totalChallengeCTF;

    public TagTotalChallengeCTFDTO(String tag, Long totalChallengeCTF) {
        this.tag = tag;
        this.totalChallengeCTF = totalChallengeCTF;
    }
}

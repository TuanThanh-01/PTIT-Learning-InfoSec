package com.ptit.elearningsecurity.data.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class TagTotalSubmitChallengeCTFDTO {
    private String tag;
    private Long totalSubmit;

    public TagTotalSubmitChallengeCTFDTO(String tag, Long totalSubmit) {
        this.tag = tag;
        this.totalSubmit = totalSubmit;
    }
}

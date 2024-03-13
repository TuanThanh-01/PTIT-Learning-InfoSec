package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class UserChallengeCTFDetailDTO {
    private String title;
    private String tag;
    private String level;
    @JsonProperty("created_at")
    private Instant createdAt;
    private String status;

    public UserChallengeCTFDetailDTO(String title, String tag, String level, Instant createdAt, String status) {
        this.title = title;
        this.tag = tag;
        this.level = level;
        this.createdAt = createdAt;
        this.status = status;
    }
}

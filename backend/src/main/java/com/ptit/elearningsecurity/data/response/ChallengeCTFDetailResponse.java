package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ChallengeCTFDetailResponse {
    private String title;
    private String tag;
    private String level;
    @JsonProperty("created_at")
    private Instant createdAt;
    private String status;
    @JsonProperty("student_identity")
    private String studentIdentity;
    private String username;
}

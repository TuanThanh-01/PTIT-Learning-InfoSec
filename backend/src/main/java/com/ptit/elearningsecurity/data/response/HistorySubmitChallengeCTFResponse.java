package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class HistorySubmitChallengeCTFResponse {
    private Integer id;
    @JsonProperty("user_identity")
    private String userIdentity;
    @JsonProperty("challenge_ctf_title")
    private String challengeCTFTitle;
    private String flag;
    private String status;
    @JsonProperty("created_at")
    private Instant createdAt;
}

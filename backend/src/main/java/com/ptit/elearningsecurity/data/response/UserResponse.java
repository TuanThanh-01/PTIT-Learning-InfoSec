package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class UserResponse {
    private String id;
    private String firstname;
    private String lastname;
    @JsonProperty("student_identity")
    private String studentIdentity;
    private String email;
    private String avatar;
    private Integer scoredChallengeCTF;
    @JsonProperty("created_at")
    private Instant createdAt;
    @JsonProperty("updated_at")
    private Instant updatedAt;
}

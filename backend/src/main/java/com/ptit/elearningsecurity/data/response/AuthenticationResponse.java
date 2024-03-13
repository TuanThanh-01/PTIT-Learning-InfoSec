package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class AuthenticationResponse {
    @JsonProperty("user_id")
    private Integer userID;
    private String firstname;
    private String lastname;
    private String email;
    private String role;
    @JsonProperty("student_identity")
    private String studentIdentity;
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
}

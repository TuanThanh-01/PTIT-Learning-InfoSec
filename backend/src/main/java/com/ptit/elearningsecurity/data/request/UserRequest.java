package com.ptit.elearningsecurity.data.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class UserRequest {
    private String firstname;
    private String lastname;
    private String studentIdentity;
    private String email;
    private String password;
}

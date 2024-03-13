package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ChallengeCTFDetailDTO {
    private String title;
    private String tag;
    private String level;
    private Instant createdAt;
    private String status;
    private String studentIdentity;
    private String firstname;
    private String lastname;

    public ChallengeCTFDetailDTO(
            String title, String tag, String level,
            Instant createdAt, String status, String studentIdentity,
            String firstname, String lastname) {
        this.title = title;
        this.tag = tag;
        this.level = level;
        this.createdAt = createdAt;
        this.status = status;
        this.studentIdentity = studentIdentity;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

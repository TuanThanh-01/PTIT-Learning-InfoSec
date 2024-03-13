package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.Instant;
import java.util.List;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class HistoryReadingLessonDTO {
    private String title;
    private List<String> category;
    private String username;
    @JsonProperty("student_identity")
    private String studentIdentity;
    @JsonProperty("created_at")
    private Instant createdAt;
}

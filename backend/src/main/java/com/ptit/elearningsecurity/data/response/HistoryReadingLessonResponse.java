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
public class HistoryReadingLessonResponse {
    private Integer id;
    @JsonProperty("created_at")
    private Instant createdAt;
    @JsonProperty("user")
    private UserResponse userResponse;
    @JsonProperty("lesson")
    private LessonResponse lessonResponse;
}

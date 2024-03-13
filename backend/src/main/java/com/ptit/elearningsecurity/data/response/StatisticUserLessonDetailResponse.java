package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class StatisticUserLessonDetailResponse {
    private String username;
    @JsonProperty("student_identity")
    private String studentIdentity;
    private String title;
    @JsonProperty("total_view")
    private Long totalView;
}

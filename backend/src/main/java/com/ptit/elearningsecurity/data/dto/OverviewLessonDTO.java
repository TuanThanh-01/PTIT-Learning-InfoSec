package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class OverviewLessonDTO {
    @JsonProperty("total_lesson")
    private Long totalLesson;
    @JsonProperty("total_category_lesson")
    private Long totalCategoryLesson;
    @JsonProperty("total_reading")
    private Long totalReading;
}

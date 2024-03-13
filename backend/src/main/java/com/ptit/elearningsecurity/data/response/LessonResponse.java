package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;
import java.util.List;

@Data
@Accessors(chain = true)
public class LessonResponse {
    private int id;
    private String title;
    private String description;
    private String content;
    @JsonProperty("cover_image")
    private String coverImage;
    @JsonProperty("category_lesson")
    private List<String> lstCategoryLessonName;
    @JsonProperty("category_lesson_description")
    private List<String> lstCategoryLessonDescription;
    @JsonProperty("created_at")
    private Instant createdAt;
    @JsonProperty("updated_at")
    private Instant updatedAt;
}

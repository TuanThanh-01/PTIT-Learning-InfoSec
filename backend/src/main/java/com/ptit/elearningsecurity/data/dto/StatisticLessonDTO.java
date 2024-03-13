package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class StatisticLessonDTO {
    private Integer id;
    private String title;
    @JsonProperty("total_view")
    private Long totalView;

    public StatisticLessonDTO(Integer id, String title, Long totalView) {
        this.id = id;
        this.title = title;
        this.totalView = totalView;
    }
}

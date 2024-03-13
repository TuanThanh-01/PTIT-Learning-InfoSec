package com.ptit.elearningsecurity.data.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@NoArgsConstructor
public class StatisticUserLessonDetailDTO {
    private String firstname;
    private String lastname;
    private String studentIdentity;
    private String title;
    private Long totalView;

    public StatisticUserLessonDetailDTO(String firstname, String lastname, String studentIdentity, String title, Long totalView) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.studentIdentity = studentIdentity;
        this.title = title;
        this.totalView = totalView;
    }
}

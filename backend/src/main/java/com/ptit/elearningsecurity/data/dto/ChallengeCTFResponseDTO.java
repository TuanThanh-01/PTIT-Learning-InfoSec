package com.ptit.elearningsecurity.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ChallengeCTFResponseDTO {
    private Integer id;
    private String title;
    private String content;
    private String level;
    private String tag;
    private String hint;
    private String flag;
    private Integer point;
    @JsonProperty("total_solve")
    private Integer totalSolve;
    @JsonProperty("url_file")
    private String urlFile;
    @JsonProperty("created_at")
    private Instant createdAt;
    @JsonProperty("updated_at")
    private Instant updatedAt;
    @JsonProperty("is_complete")
    private Boolean isCompleted;

    public ChallengeCTFResponseDTO(Integer id, String title, String content, String level,
                                   String tag, String hint, String flag, Integer point, String urlFile,
                                   Integer totalSolve, Instant createdAt, Instant updatedAt, Boolean isCompleted) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.level = level;
        this.tag = tag;
        this.hint = hint;
        this.flag = flag;
        this.point = point;
        this.urlFile = urlFile;
        this.totalSolve = totalSolve;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isCompleted = isCompleted;
    }

}

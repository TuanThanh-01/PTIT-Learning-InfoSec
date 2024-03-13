package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;

@Data
@Accessors(chain = true)
public class ChallengeCTFResponse {
    private Integer id;
    private String title;
    private String content;
    private String level;
    private String tag;
    private String hint;
    private String flag;
    private Integer point;
    @JsonProperty("url_file")
    private String urlFile;
    @JsonProperty("total_solve")
    private Integer totalSolve;
    @JsonProperty("created_at")
    private Instant createdAt;
    @JsonProperty("updated_at")
    private Instant updatedAt;
}

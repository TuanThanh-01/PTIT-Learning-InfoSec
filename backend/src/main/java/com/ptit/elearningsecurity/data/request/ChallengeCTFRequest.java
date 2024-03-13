package com.ptit.elearningsecurity.data.request;

import lombok.Data;
import lombok.experimental.Accessors;


@Data
@Accessors(chain = true)
public class ChallengeCTFRequest {
    private String title;
    private String content;
    private String level;
    private String tag;
    private String hint;
    private String flag;
    private Integer point;
}

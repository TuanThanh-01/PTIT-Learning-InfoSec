package com.ptit.elearningsecurity.data.request;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class HistorySubmitChallengeCTFRequest {
    private String flag;
    private String status;
    private Integer userId;
    private Integer challengeCTFId;
}

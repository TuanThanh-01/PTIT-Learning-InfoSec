package com.ptit.elearningsecurity.data.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class HistoryPracticeLabRequest {
    private Integer labId;
    private Integer userId;
}

package com.ptit.elearningsecurity.data.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class LabRequest {
    private String title;
    private String description;
    private String guide;
    private String url;
    private String tag;
}

package com.ptit.elearningsecurity.data.request;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.web.multipart.MultipartFile;

@Data
@Accessors(chain = true)
public class QuizRequest {
    private String name;
    private String description;
    private MultipartFile image;
}

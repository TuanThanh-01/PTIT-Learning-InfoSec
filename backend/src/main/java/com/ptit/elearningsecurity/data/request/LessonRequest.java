package com.ptit.elearningsecurity.data.request;

import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Accessors(chain = true)
public class LessonRequest {
    private String title;
    private String description;
    private String content;
    private MultipartFile coverImage;
    private List<String> lstCategoryLessonName;
}

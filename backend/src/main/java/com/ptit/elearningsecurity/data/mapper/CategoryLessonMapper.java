package com.ptit.elearningsecurity.data.mapper;

import com.ptit.elearningsecurity.data.request.CategoryLessonRequest;
import com.ptit.elearningsecurity.data.response.CategoryLessonResponse;
import com.ptit.elearningsecurity.entity.lecture.CategoryLesson;
import org.mapstruct.*;

import java.time.Instant;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class CategoryLessonMapper {

    public abstract CategoryLesson toPojo(CategoryLessonRequest categoryLessonRequest);

    @Named("toResponse")
    public abstract CategoryLessonResponse toCategoryResponse(CategoryLesson categoryLesson);

    @IterableMapping(qualifiedByName = "toResponse")
    public abstract List<CategoryLessonResponse> toListCategoryLessonResponse(List<CategoryLesson> categoryLessons);

    @AfterMapping
    protected void after(@MappingTarget CategoryLesson categoryLesson, CategoryLessonRequest categoryLessonRequest) {
        categoryLesson.setCreatedAt(Instant.now());
        categoryLesson.setUpdatedAt(null);
    }
}

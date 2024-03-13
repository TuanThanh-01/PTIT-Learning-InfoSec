package com.ptit.elearningsecurity.data.mapper;

import com.ptit.elearningsecurity.data.request.LessonRequest;
import com.ptit.elearningsecurity.data.response.LessonResponse;
import com.ptit.elearningsecurity.entity.lecture.Lesson;
import org.mapstruct.*;

import java.time.Instant;
import java.util.List;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class LessonMapper {

    @Mapping(target = "coverImage", ignore = true)
    public abstract Lesson toPojo(LessonRequest lessonRequest);

    @Mapping(target = "coverImage", ignore = true)
    @Named("toRs")
    public abstract LessonResponse toResponse(Lesson lesson);

    @IterableMapping(qualifiedByName = "toRs")
    public abstract List<LessonResponse> toListLessonResponse(List<Lesson> lesson);

    @AfterMapping
    protected void after(@MappingTarget Lesson lesson, LessonRequest lessonRequest) {
        lesson.setCreatedAt(Instant.now());
        lesson.setUpdatedAt(null);
    }
}

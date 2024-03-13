package com.ptit.elearningsecurity.data.mapper;

import com.ptit.elearningsecurity.data.request.QuestionRequest;
import com.ptit.elearningsecurity.data.response.QuestionResponse;
import com.ptit.elearningsecurity.entity.quiz.Question;
import org.mapstruct.*;

import java.time.Instant;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class QuestionMapper {

    public abstract Question toPojo(QuestionRequest questionRequest);

    @Named("toRs")
    public abstract QuestionResponse toResponse(Question question);

    @IterableMapping(qualifiedByName = "toRs")
    public abstract List<QuestionResponse> toQuestionResponses(List<Question> questions);

    @AfterMapping
    protected void after(@MappingTarget Question question, QuestionRequest questionRequest) {
        question.setCreatedAt(Instant.now());
        question.setUpdatedAt(null);
    }
}

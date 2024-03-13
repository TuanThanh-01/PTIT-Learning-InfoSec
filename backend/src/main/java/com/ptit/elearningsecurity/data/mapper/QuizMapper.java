package com.ptit.elearningsecurity.data.mapper;

import com.ptit.elearningsecurity.data.request.QuizRequest;
import com.ptit.elearningsecurity.data.response.QuizResponse;
import com.ptit.elearningsecurity.entity.quiz.Quiz;
import org.mapstruct.*;

import java.time.Instant;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class QuizMapper {

    public abstract Quiz toPojo(QuizRequest quizRequest);

    @Named("toRs")
    public abstract QuizResponse toResponse(Quiz quiz);

    @IterableMapping(qualifiedByName = "toRs")
    public abstract List<QuizResponse> toQuizResponses(List<Quiz> quizzes);

    @AfterMapping
    protected void after(@MappingTarget Quiz quiz, QuizRequest quizRequest){
        quiz.setCreatedAt(Instant.now());
        quiz.setUpdatedAt(null);
        if(quizRequest.getImage() == null) {
            quiz.setImageCover("/images/quiz/default.png");
        }
    }
}

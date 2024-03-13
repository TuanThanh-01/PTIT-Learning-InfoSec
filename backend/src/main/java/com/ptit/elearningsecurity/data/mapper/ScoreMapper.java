package com.ptit.elearningsecurity.data.mapper;

import com.ptit.elearningsecurity.data.request.ScoreRequest;
import com.ptit.elearningsecurity.data.response.ScoreResponse;
import com.ptit.elearningsecurity.entity.quiz.Score;
import org.mapstruct.*;

import java.time.Instant;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ScoreMapper {
    public abstract Score toPojo(ScoreRequest scoreRequest);

    @Named("toRs")
    public abstract ScoreResponse toResponse(Score score);

    @IterableMapping(qualifiedByName = "toRs")
    public abstract List<ScoreResponse> toScoreResponses(List<Score> scores);

    @AfterMapping
    protected void after(@MappingTarget Score score, ScoreRequest scoreRequest) {
        score.setCreatedAt(Instant.now());
        score.setUpdatedAt(null);
    }
}

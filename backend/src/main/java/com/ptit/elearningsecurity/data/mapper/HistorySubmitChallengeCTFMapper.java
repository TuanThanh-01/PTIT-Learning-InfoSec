package com.ptit.elearningsecurity.data.mapper;

import com.ptit.elearningsecurity.data.request.HistorySubmitChallengeCTFRequest;
import com.ptit.elearningsecurity.data.response.HistorySubmitChallengeCTFResponse;
import com.ptit.elearningsecurity.entity.labCTF.HistorySubmitChallengeCTF;
import org.mapstruct.*;

import java.time.Instant;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class HistorySubmitChallengeCTFMapper {
    public abstract HistorySubmitChallengeCTF toPojo(HistorySubmitChallengeCTFRequest historySubmitChallengeCTFRequest);

    @Named("toRs")
    public abstract HistorySubmitChallengeCTFResponse toResponse(HistorySubmitChallengeCTF historySubmitChallengeCTF);

    @IterableMapping(qualifiedByName = "toRs")
    public abstract List<HistorySubmitChallengeCTFResponse> toListResponse(List<HistorySubmitChallengeCTF> historySubmitChallengeCTFList);

    @AfterMapping
    protected void after(@MappingTarget HistorySubmitChallengeCTF historySubmitChallengeCTF, HistorySubmitChallengeCTFRequest historySubmitChallengeCTFRequest) {
        historySubmitChallengeCTF.setCreatedAt(Instant.now());
    }
}

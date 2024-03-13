package com.ptit.elearningsecurity.data.mapper;

import com.ptit.elearningsecurity.data.request.ChallengeCTFRequest;
import com.ptit.elearningsecurity.data.response.ChallengeCTFResponse;
import com.ptit.elearningsecurity.entity.labCTF.ChallengeCTF;
import org.mapstruct.*;

import java.time.Instant;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ChallengeCTFMapper {

    public abstract ChallengeCTF toPojo(ChallengeCTFRequest challengeCTFRequest);

    @Named("toRs")
    public abstract ChallengeCTFResponse toResponse(ChallengeCTF challengeCTF);

    @IterableMapping(qualifiedByName = "toRs")
    public abstract List<ChallengeCTFResponse> toListResponse(List<ChallengeCTF> challengeCTFList);

    @AfterMapping
    protected void after(@MappingTarget ChallengeCTF challengeCTF, ChallengeCTFRequest challengeCTFRequest) {
        challengeCTF.setCreatedAt(Instant.now());
        challengeCTF.setUpdatedAt(null);
    }
}

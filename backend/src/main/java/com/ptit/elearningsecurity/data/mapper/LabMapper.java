package com.ptit.elearningsecurity.data.mapper;

import com.ptit.elearningsecurity.data.request.LabRequest;
import com.ptit.elearningsecurity.data.response.LabResponse;
import com.ptit.elearningsecurity.entity.lab.Lab;
import org.mapstruct.*;

import java.time.Instant;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class LabMapper {

    public abstract Lab toPojo(LabRequest labRequest);

    @Named("toRs")
    public abstract LabResponse toResponse(Lab lab);

    @IterableMapping(qualifiedByName = "toRs")
    public abstract List<LabResponse> toLabResponse(List<Lab> labs);

    @AfterMapping
    protected void after(@MappingTarget Lab lab, LabRequest labRequest) {
        lab.setCreatedAt(Instant.now());
        lab.setUpdatedAt(null);
    }
}

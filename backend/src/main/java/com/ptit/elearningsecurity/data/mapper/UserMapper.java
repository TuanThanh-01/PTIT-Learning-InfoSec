package com.ptit.elearningsecurity.data.mapper;

import com.ptit.elearningsecurity.data.request.UserRequest;
import com.ptit.elearningsecurity.data.response.UserResponse;
import com.ptit.elearningsecurity.entity.User;
import org.mapstruct.*;

import java.time.Instant;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING,
        unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class UserMapper {

    public abstract User toPojo(UserRequest userRequest);

    @Named("toResponse")
    public abstract UserResponse toResponse(User user);

    @IterableMapping(qualifiedByName = "toResponse")
    public abstract List<UserResponse> toUserResponses(List<User> users);

    @AfterMapping
    protected void after(@MappingTarget User user, UserRequest userRequest) {
        user.setScoredChallengeCTF(0);
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(null);
        user.setAvatar("/images/userAvatar/default.png");
    }
}

package com.ptit.elearningsecurity.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.experimental.Accessors;

import java.time.Instant;
import java.util.List;

@Data
@Accessors(chain = true)
public class CommentResponse {
    private int id;
    private String context;
    @JsonProperty("parent_id")
    private int parentId;
    @JsonProperty("user_comment")
    private UserResponse userResponse;
    @JsonProperty("post_id")
    private int postID;
    @JsonProperty("image_url")
    private String imageUrl;
    @JsonProperty("created_at")
    private Instant createdAt;
    @JsonProperty("updated_at")
    private Instant updatedAt;
}

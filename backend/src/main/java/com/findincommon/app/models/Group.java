package com.findincommon.app.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@Document(collection = "groups")
public class Group {
    @Id
    private String id;
    @DBRef
    private User creator;
    @DBRef
    private List<User> members;
    private String name;
    private String description;
    private String conversationId;
}

package com.findincommon.app.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@Document(collection = "conversations")
public class Conversation {
    @Id
    private String id;
    @DBRef
    private List<User> participants;
    @DBRef
    private User creator;
    private String name;
}

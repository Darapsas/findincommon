package com.findincommon.app.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    @DBRef
    private Conversation conversation;
    private String creatorId;
    private String creatorFirstName;
    private String creatorLastName;
    private String text;
}

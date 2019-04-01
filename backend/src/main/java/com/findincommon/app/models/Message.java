package com.findincommon.app.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "messages")
public class Message {
    @Id
    private String id;
    @DBRef
    private String userId;
    @DBRef
    private String conversationId;
    private String text;

    public Message(String userId, String conversationId, String text) {
        this.userId = userId;
        this.conversationId = conversationId;
        this.text = text;
    }
}

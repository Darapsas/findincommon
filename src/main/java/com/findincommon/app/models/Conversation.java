package com.findincommon.app.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "conversations")
public class Conversation {
    @Id
    private String id;
    private String name;
}

package com.findincommon.app.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@Document(collection = "conversationsHelper")
public class ConversationHelper {
    @Id
    private String id;
    private List<String> usersIds;
    private List<String> messagesIds;
    private String name;
}

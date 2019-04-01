package com.findincommon.app.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "groups")
public class Group {
    private String id;
    private String name;

    public Group(String name) {
        this.name = name;
    }
}

package com.findincommon.app.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@Document(collection = "hobbies")
public class Hobby {
    private String id;
    private String name;
    private String description;

    public Hobby(String name, String description) {
        this.name = name;
        this.description = description;
    }
}

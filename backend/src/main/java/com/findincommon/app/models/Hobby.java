package com.findincommon.app.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "hobbies")
public class Hobby {
    @Id
    private String id;
    private String name;
    private String description;
}

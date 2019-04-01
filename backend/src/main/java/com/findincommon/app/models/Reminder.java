package com.findincommon.app.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "reminders")
public class Reminder {
    @Id
    private String id;
    private String name;
    private int timeInSeconds;
}

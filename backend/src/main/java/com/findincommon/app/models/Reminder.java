package com.findincommon.app.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "reminders")
public class Reminder {
    @Id
    private String id;
    private String name;
    private int timeInSeconds;

    public Reminder(String name, int timeInSeconds) {
        this.name = name;
        this.timeInSeconds = timeInSeconds;
    }
}

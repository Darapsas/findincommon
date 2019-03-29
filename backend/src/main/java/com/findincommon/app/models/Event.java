package com.findincommon.app.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "events")
public class Event {
    @Id
    private String id;
    @DBRef
    private List<Reminder> reminders;
    private String name;
    private String description;
    private Date startDate;
    private Date endDate;

    public Event(List<Reminder> reminders, String name, String description, Date startDate, Date endDate) {
        this.reminders = reminders;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}

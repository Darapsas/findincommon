package com.findincommon.app.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Builder
@Document(collection = "events")
public class Event {
    @Id
    private String id;
    @DBRef
    private List<Reminder> reminders;
    @DBRef
    private List<User> participants;
    private String name;
    private String description;
    private Date startDate;
    private Date endDate;
}

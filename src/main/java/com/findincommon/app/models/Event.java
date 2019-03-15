package com.findincommon.app.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "events")
public class Event {
    private String id;
    private String name;
    private Date startDate;
    private Date endDate;
}

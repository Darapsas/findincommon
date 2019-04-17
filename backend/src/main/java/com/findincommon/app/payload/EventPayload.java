package com.findincommon.app.payload;

import com.findincommon.app.models.Reminder;
import com.findincommon.app.models.User;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
public class EventPayload {
    private String id;
    private List<Reminder> reminders;
    private List<User> participants;
    private String name;
    private String description;
    private Date startDate;
    private Date endDate;
    private String creatorId;
}

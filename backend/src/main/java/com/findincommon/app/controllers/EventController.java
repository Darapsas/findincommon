package com.findincommon.app.controllers;

import com.findincommon.app.models.Event;
import com.findincommon.app.models.User;
import com.findincommon.app.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    EventService eventService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void createEvent(@RequestBody Event event) {
        eventService.save(
                Event
                        .builder()
                        .reminders(event.getReminders())
                        .name(event.getName())
                        .description(event.getDescription())
                        .startDate(event.getStartDate())
                        .endDate(event.getEndDate())
                        .build());
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping(value = "/user/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Event> getUserEvents(@PathVariable String id) {
        List<Event> userEvents = new ArrayList<>();
        List<Event> events = eventService.getAllEvents();

        for (Event event : events) {
            for (User participant: event.getParticipants()) {
                if (participant.getId().equals(id)) {
                    userEvents.add(event);
                    break;
                }
            }
        }

        return userEvents;
    }


    @GetMapping(value = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public Event getEvent(@PathVariable String id) {
        return eventService.getEvent(id);
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public void updateEvent(@PathVariable String id, @RequestBody Event event) {
        eventService.save(
                Event
                        .builder()
                        .id(event.getId())
                        .reminders(event.getReminders())
                        .name(event.getName())
                        .description(event.getDescription())
                        .startDate(event.getStartDate())
                        .endDate(event.getEndDate())
                        .build());
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }

}

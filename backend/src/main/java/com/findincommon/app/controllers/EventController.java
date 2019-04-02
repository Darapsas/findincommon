package com.findincommon.app.controllers;

import com.findincommon.app.models.Event;
import com.findincommon.app.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    EventService eventService;

    @PostMapping
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

    @GetMapping(value = "/{id}")
    public Event getEvent(@PathVariable String id) {
        return eventService.getEvent(id);
    }

    @PutMapping(value = "/{id}")
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
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }

}

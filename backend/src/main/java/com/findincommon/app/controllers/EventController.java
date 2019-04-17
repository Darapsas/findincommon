package com.findincommon.app.controllers;

import com.findincommon.app.models.Event;
import com.findincommon.app.models.User;
import com.findincommon.app.payload.EventPayload;
import com.findincommon.app.repository.EventRepository;
import com.findincommon.app.services.EventService;
import com.findincommon.app.services.UserService;
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

    @Autowired
    UserService userService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public void createEvent(@RequestBody EventPayload event) {
        eventService.save(
                Event
                        .builder()
                        .reminders(event.getReminders())
                        .participants(event.getParticipants())
                        .name(event.getName())
                        .description(event.getDescription())
                        .startDate(event.getStartDate())
                        .endDate(event.getEndDate())
                        .build());
        //eventService.flush
        //System.out.println();
        //System.out.println(event.getCreatorId());
        //System.out.println();
        //System.out.println(eventService.getEvent(event.getId()));
        //System.out.println();
        //User creator = userService.getUser(event.getCreatorId());
        //List<Event> events = new ArrayList<>(creator.getEvents());
        //events.add(eventService.getEvent(event.getId()));
        //creator.setEvents(events);
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
            for (User participant : event.getParticipants()) {
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
                        .participants(event.getParticipants())
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

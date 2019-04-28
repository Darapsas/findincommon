package com.findincommon.app.controllers;

import com.findincommon.app.models.Event;
import com.findincommon.app.models.User;
import com.findincommon.app.repository.EventRepository;
import com.findincommon.app.services.EventService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class EventControllerTest {

    @Autowired
    private EventService eventService;

    @MockBean
    private EventRepository eventRepository;

    @Test
    public void createEvent() {
        Event event = Event
                .builder()
                .id("123")
                .name("name")
                .description("hey hey hey")
                .build();

        eventRepository.save(event);
        verify(eventRepository, times(1)).save(event);
    }

    @Test
    public void getEvents() {
        when(eventRepository.findAll()).thenReturn(Arrays.asList(
                Event
                        .builder()
                        .id("1")
                        .name("name")
                        .description("description")
                        .build(),
                Event
                        .builder()
                        .id("2")
                        .name("name2")
                        .description("description2")
                        .build(),
                Event
                        .builder()
                        .id("3")
                        .name("name3")
                        .description("description3")
                        .build(),
                Event
                        .builder()
                        .id("4")
                        .name("name4")
                        .description("description4")
                        .build()
        ));
        assertEquals(4, eventService.getAllEvents().size());
    }

    @Test
    public void getUserEvents() {
        String id = "3";
        when(eventRepository.findAll()).thenReturn(Arrays.asList(
                Event
                        .builder()
                        .id("1")
                        .name("name")
                        .description("description")
                        .creator(User
                                .builder()
                                .id("user")
                                .build())
                        .participants(Arrays.asList(
                                User
                                        .builder()
                                        .id("3")
                                        .build(),
                                User
                                        .builder()
                                        .id("4")
                                        .build()
                        ))
                        .build(),
                Event
                        .builder()
                        .id("2")
                        .name("name2")
                        .description("description2")
                        .creator(User
                                .builder()
                                .id("user2")
                                .build())
                        .participants(Arrays.asList(
                                User
                                        .builder()
                                        .id("3")
                                        .build(),
                                User
                                        .builder()
                                        .id("4")
                                        .build()
                        ))
                        .build(),
                Event
                        .builder()
                        .id("3")
                        .name("name3")
                        .description("description3")
                        .creator(User
                                .builder()
                                .id("user3")
                                .build())
                        .participants(Arrays.asList(
                                User
                                        .builder()
                                        .id("1")
                                        .build(),
                                User
                                        .builder()
                                        .id("2")
                                        .build()
                        ))
                        .build(),
                Event
                        .builder()
                        .id("4")
                        .name("name4")
                        .description("description4")
                        .creator(User
                                .builder()
                                .id("user3")
                                .build())
                        .participants(Arrays.asList(
                                User
                                        .builder()
                                        .id("1")
                                        .build(),
                                User
                                        .builder()
                                        .id("2")
                                        .build()
                        ))
                        .build()
        ));

        List<Event> userEvents = new ArrayList<>();
        List<Event> events = eventService.getAllEvents();

        String creator;

        for (Event event : events) {
            creator = event.getCreator().getId();
            for (User participant : event.getParticipants()) {
                if (participant.getId().equals(id) && !participant.getId().equals(creator)) {
                    userEvents.add(event);
                    break;
                }
            }
        }
        assertEquals(2, userEvents.size());
    }

    @Test
    public void getUserCreatedEvents() {
        String id = "user3";
        when(eventRepository.findAll()).thenReturn(Arrays.asList(
                Event
                        .builder()
                        .id("1")
                        .name("name")
                        .description("description")
                        .creator(User
                                .builder()
                                .id("user")
                                .build())
                        .participants(Arrays.asList(
                                User
                                        .builder()
                                        .id("3")
                                        .build(),
                                User
                                        .builder()
                                        .id("4")
                                        .build()
                        ))
                        .build(),
                Event
                        .builder()
                        .id("2")
                        .name("name2")
                        .description("description2")
                        .creator(User
                                .builder()
                                .id("user2")
                                .build())
                        .participants(Arrays.asList(
                                User
                                        .builder()
                                        .id("3")
                                        .build(),
                                User
                                        .builder()
                                        .id("4")
                                        .build()
                        ))
                        .build(),
                Event
                        .builder()
                        .id("3")
                        .name("name3")
                        .description("description3")
                        .creator(User
                                .builder()
                                .id("user3")
                                .build())
                        .participants(Arrays.asList(
                                User
                                        .builder()
                                        .id("1")
                                        .build(),
                                User
                                        .builder()
                                        .id("2")
                                        .build()
                        ))
                        .build(),
                Event
                        .builder()
                        .id("4")
                        .name("name4")
                        .description("description4")
                        .creator(User
                                .builder()
                                .id("user3")
                                .build())
                        .participants(Arrays.asList(
                                User
                                        .builder()
                                        .id("1")
                                        .build(),
                                User
                                        .builder()
                                        .id("2")
                                        .build()
                        ))
                        .build()
        ));

        List<Event> userEvents = new ArrayList<>();
        List<Event> events = eventService.getAllEvents();

        for (Event event : events) {
            if (event.getCreator().getId().equals(id)) {
                userEvents.add(event);
            }
        }
        assertEquals(2, userEvents.size());
    }

    @Test
    public void getEvent() {
        String id = "123";
        when(eventRepository.findById(id)).thenReturn(Optional.of(
                Event
                        .builder()
                        .id("123")
                        .build()
        ));
        assertEquals("123", eventService.getEvent(id).getId());
    }

    @Test
    public void updateEvent() {
        Event event = Event
                .builder()
                .id("123")
                .build();
        eventService.save(event);
        verify(eventRepository, times(1)).save(event);
    }

    @Test
    public void deleteEvent() {
        Event event = Event
                .builder()
                .id("123")
                .build();
        eventService.deleteEvent(event.getId());
        verify(eventRepository, times(1)).deleteById(event.getId());
    }
}
package com.findincommon.app.services;

import com.findincommon.app.models.Event;
import com.findincommon.app.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public void save(Event event) {
        eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
    public List<Event> getUserEvents(String id) {
        return eventRepository.findByCreatorId(id);
    }

    public Event getEvent(String id) {
        return eventRepository.findById(id).get();
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }

}

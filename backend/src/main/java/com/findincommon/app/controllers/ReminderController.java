package com.findincommon.app.controllers;

import com.findincommon.app.models.Reminder;
import com.findincommon.app.services.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/reminders")
public class ReminderController {

    @Autowired
    ReminderService reminderService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public void createReminder(@RequestBody Reminder reminder) {
        reminderService.save(
                Reminder
                        .builder()
                        .name(reminder.getName())
                        .timeInSeconds(reminder.getTimeInSeconds())
                        .build());
    }

    @GetMapping
    public List<Reminder> getReminders() {
        return reminderService.getAllReminders();
    }

    @GetMapping(value = "/{id}")
    public Reminder getReminder(@PathVariable String id) {
        return reminderService.getReminder(id);
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateReminder(@PathVariable String id, @RequestBody Reminder reminder) {
        reminderService.save(
                Reminder
                        .builder()
                        .id(id)
                        .name(reminder.getName())
                        .timeInSeconds(reminder.getTimeInSeconds())
                        .build());
    }

    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteReminder(@PathVariable String id) {
        reminderService.deleteReminder(id);
    }

}

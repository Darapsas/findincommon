package com.findincommon.app.services;


import com.findincommon.app.models.Reminder;
import com.findincommon.app.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReminderService {

    @Autowired
    private ReminderRepository reminderRepository;

    public void save(Reminder reminder) {
        reminderRepository.save(reminder);
    }

    public List<Reminder> getAllReminders() {
        return reminderRepository.findAll();
    }

    public Reminder getReminder(String id) {
        return reminderRepository.findById(id).get();
    }

    public void deleteReminder(String id) {
        reminderRepository.deleteById(id);
    }

}

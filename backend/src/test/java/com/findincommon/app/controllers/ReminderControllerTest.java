package com.findincommon.app.controllers;

import com.findincommon.app.models.Reminder;
import com.findincommon.app.repository.ReminderRepository;
import com.findincommon.app.services.ReminderService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;


@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class ReminderControllerTest {

    @Autowired
    private ReminderService reminderService;

    @MockBean
    private ReminderRepository reminderRepository;

    @Test
    public void createReminder() {
        Reminder reminder = Reminder
                .builder()
                .id("123")
                .name("hey")
                .timeInSeconds(100)
                .build();

        reminderRepository.save(reminder);
        verify(reminderRepository, times(1)).save(reminder);
    }

    @Test
    public void getReminders() {
        when(reminderRepository.findAll()).thenReturn(Arrays.asList(
                Reminder
                        .builder()
                        .id("123")
                        .name("namer")
                        .timeInSeconds(1234)
                        .build(),
                Reminder
                        .builder()
                        .id("12")
                        .name("name")
                        .timeInSeconds(124)
                        .build()
        ));
        assertEquals(2, reminderService.getAllReminders().size());
    }

    @Test
    public void getReminder() {
        String id = "123";
        when(reminderRepository.findById(id)).thenReturn(Optional.of(
                Reminder
                        .builder()
                        .id("123")
                        .name("hey")
                        .timeInSeconds(100)
                        .build()
        ));
        assertEquals("123", reminderService.getReminder(id).getId());
    }

    @Test
    public void updateReminder() {
        Reminder reminder = Reminder
                .builder()
                .id("123")
                .name("hey")
                .timeInSeconds(100)
                .build();
        reminderService.save(reminder);
        verify(reminderRepository, times(1)).save(reminder);
    }

    @Test
    public void deleteReminder() {
        Reminder reminder = Reminder
                .builder()
                .id("123")
                .name("hey")
                .timeInSeconds(100)
                .build();
        reminderService.deleteReminder(reminder.getId());
        verify(reminderRepository, times(1)).deleteById(reminder.getId());
    }
}
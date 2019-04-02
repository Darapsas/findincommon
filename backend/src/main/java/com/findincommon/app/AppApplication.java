package com.findincommon.app;

import com.findincommon.app.models.Event;
import com.findincommon.app.models.Reminder;
import com.findincommon.app.repository.EventRepository;
import com.findincommon.app.repository.ReminderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@SpringBootApplication
public class AppApplication {

    private static final Logger log = LoggerFactory.getLogger(AppApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }

    @Bean
    public CommandLineRunner necessary(EventRepository eventRepository, ReminderRepository reminderRepository) {
        return (args) -> {
            // create example data
            reminderRepository.save(
                    Reminder
                            .builder()
                            .name("15 min. before")
                            .timeInSeconds(60 * 60 * 15)
                            .build());
            reminderRepository.save(
                    Reminder
                            .builder()
                            .name("1 hour before")
                            .timeInSeconds(60 * 60 * 60)
                            .build());
            reminderRepository.save(
                    Reminder
                            .builder()
                            .name("1 day before")
                            .timeInSeconds(60 * 60 * 60 * 24)
                            .build());

            eventRepository.save(
                    Event
                            .builder()
                            .reminders(
                                    Arrays.asList(
                                            reminderRepository.findByName("15 min. before"),
                                            reminderRepository.findByName("1 hour before")
                                    ))
                            .name("Flat earth is the truth")
                            .description("With this disuccion we will try to get different opinions about flat earth.")
                            .startDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date())))
                            .endDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date())))
                            .build()
            );
            eventRepository.save(
                    Event
                            .builder()
                            .reminders(
                                    Arrays.asList(
                                            reminderRepository.findByName("15 min. before")
                                    ))
                            .name("Lizard people con")
                            .description("Is trump a lizard? Find out here.")
                            .startDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date())))
                            .endDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date())))
                            .build()
            );
            eventRepository.save(
                    Event
                            .builder()
                            .reminders(
                                    Arrays.asList(
                                            reminderRepository.findByName("15 min. before"),
                                            reminderRepository.findByName("1 day before")
                                    ))
                            .name("Pyramids")
                            .description("Pyramids were built by aliens. Or were they?")
                            .startDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date())))
                            .endDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date())))
                            .build()
            );
            eventRepository.save(
                    Event
                            .builder()
                            .reminders(
                                    Arrays.asList(
                                            reminderRepository.findByName("1 day before")
                                    ))
                            .name("Chemtrails")
                            .description("Why you are stupid and you believe in chemtrails... Because they are real!")
                            .startDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date())))
                            .endDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date())))
                            .build()
            );
        };
    }

}

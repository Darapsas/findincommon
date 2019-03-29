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
            reminderRepository.save(new Reminder("15 min. before", 60*60*15));
            reminderRepository.save(new Reminder("1 hour before", 60*60*60));
            reminderRepository.save(new Reminder("1 day before", 60*60*60*24));

            eventRepository.save(
                    new Event(
                            Arrays.asList(
                                    reminderRepository.findByName("15 min. before"),
                                    reminderRepository.findByName("1 hour before")
                            ),
                            "Flat earth is the truth",
                            "With this disuccion we will try to get different opinions about flat earth." ,
                            new Date(),
                            new Date()
                    )
            );
            eventRepository.save(
                    new Event(
                            Arrays.asList(
                                    reminderRepository.findByName("15 min. before")
                            ),
                            "Lizard people con",
                            "Is trump a lizard? Find out here." ,
                            new Date(),
                            new Date()
                    )
            );
            eventRepository.save(
                    new Event(
                            Arrays.asList(
                                    reminderRepository.findByName("15 min. before"),
                                    reminderRepository.findByName("1 day before")
                            ),
                            "Pyramids",
                            "Pyramids were built by aliens. Or were they?" ,
                            new Date(),
                            new Date()
                    )
            );
            eventRepository.save(
                    new Event(
                            Arrays.asList(
                                    reminderRepository.findByName("1 day before")
                            ),
                            "Chemtrails",
                            "Why you are stupid and you believe in chemtrails... Because they are real!" ,
                            new Date(),
                            new Date()
                    )
            );
        };
    }

}

package com.findincommon.app;

import com.findincommon.app.configuration.AppProperties;
import com.findincommon.app.models.*;
import com.findincommon.app.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class AppApplication {

    private static final Logger log = LoggerFactory.getLogger(AppApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }

    @Bean
    public CommandLineRunner necessary(
            EventRepository eventRepository,
            ReminderRepository reminderRepository,
            HobbyRepository hobbyRepository,
            MessageRepository messageRepository,
            UserRepository userRepository,
            ConversationRepository conversationRepository
    ) {
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

            String[][] hobbies = {
                    {"astronomy", "Astronomy (from Greek: ἀστρονομία) is a natural science that studies celestial objects and phenomena."},
                    {"baseball", "Baseball is a bat-and-ball game played between two opposing teams who take turns batting and fielding. "},
                    {"basketball", "Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball (approximately 9.4 inches (24 cm) in diameter) through the defender's hoop (a basket 18 inches (46 cm) in diameter mounted 10 feet (3.048 m) high to a backboard at each end of the court) while preventing the opposing team from shooting through their own hoop."},
                    {"beekeeping", "Beekeeping (or apiculture) is the maintenance of bee colonies, commonly in man-made hives, by humans."},
                    {"blacksmith", "A blacksmith is a metalsmith who creates objects from wrought iron or steel by forging the metal, using tools to hammer, bend, and cut (cf. whitesmith)."},
                    {"boardsport", "Boardsports are sports that are played with some sort of board as the primary equipment."},
                    {"butterfly watching", "Butterfly watching (also called butterflying) is a hobby concerned with the observation and study of butterflies. It also includes the \"catch and release\" of butterflies. "},
                    {"canyoning", "Canyoning (canyoneering in the United States, kloofing in South Africa) is travelling in canyons using a variety of techniques that may include other outdoor activities such as walking, scrambling, climbing, jumping, abseiling (rappelling), and swimming. "},
                    {"fishing", "Fishing is the activity of trying to catch fish."},
                    {"gunsmith", "A gunsmith is a person who repairs, modifies, designs, or builds guns."},
                    {"homebrewing", "Homebrewing is the brewing of beer, mead, and ciders on a small scale for personal, non-commercial purposes."},
                    {"hydroponics", "Hydroponics is a subset of hydroculture, which is a method of growing plants without soil by using mineral nutrient solutions in a water solvent."},
                    {"ice skating", "Ice skating is the self-propulsion of a person across a sheet of ice, using metal-bladed ice skates to glide on the ice surface."},
                    {"jigsaw puzzle", "A jigsaw puzzle is a tiling puzzle that requires the assembly of often oddly shaped interlocking and tessellating pieces."}
            };

            for (String[] hobby : hobbies) {
                hobbyRepository.save(
                        Hobby
                                .builder()
                                .name(hobby[0])
                                .description(hobby[1])
                                .build());
            }


            userRepository.save(
                    User
                            .builder()
                            .firstName("Darius")
                            .lastName("Rainys")
                            .email("darius562@gmail.com")
                            .build());

            userRepository.save(
                    User
                            .builder()
                            .firstName("Jone")
                            .lastName("Doe")
                            .email("doe@gmail.com")
                            .build());

            User[] users = {
                    userRepository.findByEmail("darius562@gmail.com"),
                    userRepository.findByEmail("doe@gmail.com")
            };

            Message[] messages = {
                    messageRepository.save(Message
                            .builder()
                            .creatorId(users[0].getId())
                            .creatorFirstName(users[0].getFirstName())
                            .creatorLastName(users[0].getLastName())
                            .text("hello")
                            .build()),
                    messageRepository.save(Message
                            .builder()
                            .creatorId(users[0].getId())
                            .creatorFirstName(users[0].getFirstName())
                            .creatorLastName(users[0].getLastName())
                            .text("How are you? :D")
                            .build()),
                    messageRepository.save(Message
                            .builder()
                            .creatorId(users[1].getId())
                            .creatorFirstName(users[1].getFirstName())
                            .creatorLastName(users[1].getLastName())
                            .text("Hi")
                            .build()),
                    messageRepository.save(Message
                            .builder()
                            .creatorId(users[1].getId())
                            .creatorFirstName(users[1].getFirstName())
                            .creatorLastName(users[1].getLastName())
                            .text("I'm good")
                            .build()),
                    messageRepository.save(Message
                            .builder()
                            .creatorId(users[1].getId())
                            .creatorFirstName(users[1].getFirstName())
                            .creatorLastName(users[1].getLastName())
                            .text("And you?")
                            .build()),
                    messageRepository.save(Message
                            .builder()
                            .creatorId(users[0].getId())
                            .creatorFirstName(users[0].getFirstName())
                            .creatorLastName(users[0].getLastName())
                            .text("Very good :D")
                            .build()),
                    messageRepository.save(Message
                            .builder()
                            .creatorId(users[1].getId())
                            .creatorFirstName(users[1].getFirstName())
                            .creatorLastName(users[1].getLastName())
                            .text("Good then")
                            .build())
            };

            conversationRepository.save(
                    Conversation
                            .builder()
                            .name("First one")
                            .participants(Arrays.asList(users))
                            .messages(Arrays.asList(messages
                            ))
                            .build());

        };
    }

}

package com.findincommon.app;

import com.findincommon.app.config.AppProperties;
import com.findincommon.app.models.*;
import com.findincommon.app.repository.*;
import com.findincommon.app.services.EmailReminderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executor;

@EnableAsync
@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class AppApplication {

    private static final Logger log = LoggerFactory.getLogger(AppApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }

    @Autowired
    private EmailReminderService emailReminderService;

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
            // Change when testing
            if (reminderRepository.findAll().size() == 0) {
//           if (false) {
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
                        {"jigsaw puzzle", "A jigsaw puzzle is a tiling puzzle that requires the assembly of often oddly shaped interlocking and tessellating pieces."},
                        {"calisthenics", "Calisthenics is a form of exercise consisting of a variety of gross motor movements—running, standing, grasping, pushing, etc.—often performed rhythmically and with minimal equipment, as bodyweight exercises. "},
                        {"weight training", "Weight training is a common type of strength training for developing the strength and size of skeletal muscles. It utilizes the force of gravity in the form of weighted bars, dumbbells or weight stacks in order to oppose the force generated by muscle through concentric or eccentric contraction. "},
                        {"woodworking", "Woodworking is the activity or skill of making items from wood, and includes cabinet making (cabinetry and furniture), wood carving, joinery, carpentry, and woodturning."},
                        {"csgo", "Counter-Strike: Global Offensive (CS:GO) is a multiplayer first-person shooter video game developed by Hidden Path Entertainment and Valve Corporation."},
                        {"euro truck", "Euro Truck Simulator (known as Big Rig Europe in North America) is a 2008 truck simulation game developed and published by SCS Software, set in Europe."},
                        {"fifa", "FIFA 19 is a football simulation video game developed by EA Vancouver as part of Electronic Arts' FIFA series. Announced on 6 June 2018 for its E3 2018 press conference, it was released on 28 September 2018 for PlayStation 3, PlayStation 4, Xbox 360, Xbox One, Nintendo Switch, and Microsoft Windows."},
                        {"motorcycling", "Motorcycling is riding a motorcycle. For some people, motorcycling may be the only affordable form of individual motorized transportation, and small-displacement motorcycles are the most common motor vehicle in the most populous countries, including India, China and Indonesia."}
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
                                .name("Darius Rainys")
                                .email("darius562@gmail.com")
                                .imageUrl("https://lh6.googleusercontent.com/-xtCf1H18q7c/AAAAAAAAAAI/AAAAAAAAA3g/9VL5ZY4_hdo/photo.jpg")
                                .provider(AuthProvider.google)
                                .providerId("100722226320893340969")
                                .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
                                .hobbies(
                                        Arrays
                                                .asList(
                                                        hobbyRepository.findByName("baseball"),
                                                        hobbyRepository.findByName("canyoning"),
                                                        hobbyRepository.findByName("gunsmith"),
                                                        hobbyRepository.findByName("ice skating")
                                                ))
                                .build());
                userRepository.save(
                        User
                                .builder()
                                .name("Beam Jim")
                                .email("Jim@gmail.com")
                                .imageUrl("https://img.buzzfeed.com/buzzfeed-static/static/2017-05/9/10/asset/buzzfeed-prod-fastlane-01/sub-buzz-17413-1494339583-8.jpg?downsize=700:*&output-format=auto&output-quality=auto")
                                .provider(AuthProvider.google)
                                .providerId("100722226320893340969")
                                .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
                                .hobbies(
                                        Arrays
                                                .asList(
                                                        hobbyRepository.findByName("baseball"),
                                                        hobbyRepository.findByName("gunsmith"),
                                                        hobbyRepository.findByName("ice skating")
                                                ))
                                .build());


                userRepository.save(
                        User
                                .builder()
                                .name("Actor")
                                .email("go@gmail.com")
                                .imageUrl("https://amp.businessinsider.com/images/562a74cbbd86ef16008c4535-750-563.jpg")
                                .provider(AuthProvider.google)
                                .providerId("100722226320893340969")
                                .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
                                .hobbies(
                                        Arrays
                                                .asList(
                                                        hobbyRepository.findByName("baseball"),
                                                        hobbyRepository.findByName("canyoning")
                                                ))
                                .build());
                userRepository.save(
                        User
                                .builder()
                                .name("The Marvel")
                                .email("marvel@gmail.com")
                                .imageUrl("https://cdn1.i-scmp.com/sites/default/files/styles/1200x800/public/images/methode/2018/04/11/a1a2d104-3d3c-11e8-b6d9-57447a4b43e5_1280x720_154233.JPG?itok=lZXuMfyj")
                                .provider(AuthProvider.google)
                                .providerId("100722226320893340969")
                                .description("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
                                .hobbies(
                                        Arrays
                                                .asList(
                                                        hobbyRepository.findByName("ice skating")
                                                ))
                                .build());


                reminderRepository.save(
                        Reminder
                                .builder()
                                .name("15 min. before")
                                .timeInSeconds(60 * 15)
                                .build());
                reminderRepository.save(
                        Reminder
                                .builder()
                                .name("1 hour before")
                                .timeInSeconds(60 * 60)
                                .build());
                reminderRepository.save(
                        Reminder
                                .builder()
                                .name("1 day before")
                                .timeInSeconds(60 * 60 * 24)
                                .build());


                eventRepository.save(
                        Event
                                .builder()
                                .reminders(
                                        Arrays.asList(
                                                reminderRepository.findByName("15 min. before"),
                                                reminderRepository.findByName("1 hour before")
                                        ))
                                .participants(
                                        Arrays.asList(
                                                userRepository.findByEmail("marvel@gmail.com").get(),
                                                userRepository.findByEmail("go@gmail.com").get()
                                        ))
                                .name("Flat earth is the truth")
                                .creator(userRepository.findByEmail("darius562@gmail.com").get())
                                .description("With this disuccion we will try to get different opinions about flat earth.")
                                .startDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date().getTime() + (1000 * 60 * 60 * 24))))
                                .endDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date().getTime() + (1000 * 60 * 60 * 25))))
                                .build()
                );
                eventRepository.save(
                        Event
                                .builder()
                                .reminders(
                                        Arrays.asList(
                                                reminderRepository.findByName("15 min. before")
                                        ))
                                .participants(
                                        Arrays.asList(
                                                userRepository.findByEmail("go@gmail.com").get()
                                        ))
                                .name("Lizard people con")
                                .creator(userRepository.findByEmail("darius562@gmail.com").get())
                                .description("Is trump a lizard? Find out here.")
                                .startDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date().getTime() + (1000 * 60 * 60 * 24))))
                                .endDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date().getTime() + (1000 * 60 * 60 * 25))))
                                .build()
                );


                eventRepository.save(
                        Event
                                .builder()
                                .reminders(
                                        Arrays.asList(
                                                reminderRepository.findByName("1 day before"),
                                                reminderRepository.findByName("15 min. before")
                                        ))
                                .participants(
                                        Arrays.asList(
                                                userRepository.findByEmail("darius562@gmail.com").get()
                                        ))
                                .name("Pyramids")
                                .creator(userRepository.findByEmail("go@gmail.com").get())
                                .description("Pyramids were built by aliens. Or were they?")
                                .startDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date().getTime() + (1000 * 60 * 60 * 24))))
                                .endDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date().getTime() + (1000 * 60 * 60 * 25))))
                                .build()
                );
                eventRepository.save(
                        Event
                                .builder()
                                .reminders(
                                        Arrays.asList(
                                                reminderRepository.findByName("1 day before")
                                        ))
                                .participants(
                                        Arrays.asList(
                                                userRepository.findByEmail("darius562@gmail.com").get(),
                                                userRepository.findByEmail("Jim@gmail.com").get()
                                        ))
                                .creator(userRepository.findByEmail("darius562@gmail.com").get())
                                .name("Chemtrails")
                                .description("Why you are stupid and you believe in chemtrails... Because they are real!")
                                .startDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date().getTime() + (1000 * 60 * 60 * 24))))
                                .endDate(new SimpleDateFormat("yyyy-MM-dd hh:mm").parse(new SimpleDateFormat("yyyy-MM-dd hh:mm").format(new Date().getTime() + (1000 * 60 * 60 * 25))))
                                .build()
                );


                conversationRepository.save(
                        Conversation
                                .builder()
                                .creator(userRepository.findByEmail("darius562@gmail.com").get())
                                .name("Nice weather")
                                .participants(
                                        Arrays.asList(
                                                userRepository.findByEmail("marvel@gmail.com").get(),
                                                userRepository.findByEmail("go@gmail.com").get()
                                        ))
                                .build()
                );
                conversationRepository.save(
                        Conversation
                                .builder()
                                .creator(userRepository.findByEmail("marvel@gmail.com").get())
                                .name("Bad weather")
                                .participants(
                                        Arrays.asList(
                                                userRepository.findByEmail("darius562@gmail.com").get(),
                                                userRepository.findByEmail("marvel@gmail.com").get(),
                                                userRepository.findByEmail("go@gmail.com").get()
                                        ))
                                .build()
                );

                messageRepository.save(Message
                        .builder()
                        .creator(userRepository.findByEmail("darius562@gmail.com").get())
                        .conversation(conversationRepository.findByName("Nice weather").getId())
                        .text("hello")
                        .build());
                messageRepository.save(Message
                        .builder()
                        .creator(userRepository.findByEmail("darius562@gmail.com").get())
                        .conversation(conversationRepository.findByName("Nice weather").getId())
                        .text("How are you? :D")
                        .build());
                messageRepository.save(Message
                        .builder()
                        .creator(userRepository.findByEmail("marvel@gmail.com").get())
                        .conversation(conversationRepository.findByName("Nice weather").getId())
                        .text("Hi")
                        .build());
                messageRepository.save(Message
                        .builder()
                        .creator(userRepository.findByEmail("marvel@gmail.com").get())
                        .conversation(conversationRepository.findByName("Nice weather").getId())
                        .text("I'm good")
                        .build());
                messageRepository.save(Message
                        .builder()
                        .creator(userRepository.findByEmail("marvel@gmail.com").get())
                        .conversation(conversationRepository.findByName("Nice weather").getId())
                        .text("And you?")
                        .build());
                messageRepository.save(Message
                        .builder()
                        .creator(userRepository.findByEmail("darius562@gmail.com").get())
                        .conversation(conversationRepository.findByName("Nice weather").getId())
                        .text("Very good :D")
                        .build());
                messageRepository.save(Message
                        .builder()
                        .creator(userRepository.findByEmail("marvel@gmail.com").get())
                        .conversation(conversationRepository.findByName("Nice weather").getId())
                        .text("Good then")
                        .build());
            }

        };
    }

    @Profile("!test")
    @Bean
    public CommandLineRunner emailReminderSender(EventRepository eventRepository) {
        return args -> {

            while (true) {
                System.out.println("EmailSender: sleeping");
                Thread.sleep(10000);
                List<Event> events = eventRepository.findAll();
                System.out.println("EmailSender: checking events");
                for (Event event : events) {
                    System.out.println("EmailSender: checking event: " + event.getName());
                    List<Reminder> reminders = new ArrayList<>(event.getReminders());
                    for (Reminder reminder : event.getReminders()) {
                        long now = System.currentTimeMillis() / 1000;
                        long eventStartDate = event.getStartDate().toInstant().toEpochMilli() / 1000;
                        System.out.println((eventStartDate - now));
                        if ((eventStartDate - now) <= (long) reminder.getTimeInSeconds()) {
                            System.out.println("removing reminder");
                            reminders.remove(reminder);
                            event.setReminders(reminders);
                            System.out.println("EmailSender: sending reminders (" + reminder.getName() + ") for event: " + event.getName());

                            User creator = event.getCreator();
                            try {
                                emailReminderService.sendEmailReminder(creator.getEmail(), creator.getName(), reminder.getName(), event.getName());
                            } catch (Exception e) {
                                System.out.println("Error Sending email: " + e.getMessage());
                            }
                            System.out.println("EmailSender: email sent");

                            for (User participant : event.getParticipants()) {
                                try {
                                    emailReminderService.sendEmailReminder(participant.getEmail(), participant.getName(), reminder.getName(), event.getName());
                                } catch (Exception e) {
                                    System.out.println("Error Sending email: " + e.getMessage());
                                }
                                System.out.println("EmailSender: email sent");
                            }
                        }
                    }
                    eventRepository.save(event);
                }
            }
        };

    }

    @Profile("!test")
    @Bean(name = "threadPoolTaskExecutor")
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(20);
        executor.setMaxPoolSize(1000);
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("EmailReminder-");
        executor.initialize();
        return executor;
    }
}

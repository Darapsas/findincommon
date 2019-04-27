package com.findincommon.app.controllers;

import com.findincommon.app.exception.ResourceNotFoundException;
import com.findincommon.app.models.*;
import com.findincommon.app.payload.UserUpdatePayload;
import com.findincommon.app.repository.UserRepository;
import com.findincommon.app.security.CurrentUser;
import com.findincommon.app.security.UserPrincipal;
import com.findincommon.app.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ConversationService conversationService;

    @Autowired
    GroupService groupService;

    @Autowired
    EventService eventService;

    @Autowired
    MessageService messageService;

    @Autowired
    UserService userService;

    @Autowired
    HobbyService hobbyService;

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public void updateUser(@PathVariable String id, @RequestBody UserUpdatePayload data) {
        User updatedUser = userService.getUser(id);
        updatedUser.setImageUrl(data.getImageUrl());
        updatedUser.setName(data.getName());
        updatedUser.setDescription(data.getDescription());
        userService.save(updatedUser);
    }

    @GetMapping("/user/info")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{query}/hobbies")
    @PreAuthorize("hasRole('USER')")
    public List<Hobby> getUserHobbies(@PathVariable String query) {
        return userRepository.findById(query).get().getHobbies();
    }

    @PostMapping("/{userId}/hobby/{hobbyId}")
    @PreAuthorize("hasRole('USER')")
    public void addHobbyToUser(@PathVariable String userId, @PathVariable String hobbyId) {
        User user = userService.getUser(userId);
        List<Hobby> hobbies = new ArrayList<>(user.getHobbies());

        boolean test = false;
        for (Hobby hobby : hobbies) {
            if (hobby.getId().equals(hobbyId)) {
            }
        }

        hobbies.add(hobbyService.getHobby(hobbyId));

        user.setHobbies(hobbies);
        userService.save(user);
    }

    @DeleteMapping("/{userId}/hobby/{hobbyId}")
    @PreAuthorize("hasRole('USER')")
    public void removeHobbyFromUser(@PathVariable String userId, @PathVariable String hobbyId) {
        User user = userService.getUser(userId);
        List<Hobby> hobbies = new ArrayList<>(user.getHobbies());
        hobbies.removeIf(hobby -> hobby.getId().equals(hobbyId));
        user.setHobbies(hobbies);
        userService.save(user);
    }

    @GetMapping("/hobbies/{query}")
    @PreAuthorize("hasRole('USER')")
    public List<User> getUsersByHobbies(@PathVariable String query) {
        List<User> users = userService.getAllUsers();
        List<User> searchedUsers = new ArrayList<>();

        for (User user : users) {
            List<Hobby> hobbies = user.getHobbies();

            String[] queryArguments = query.split(",");

            String value;
            String test;
            boolean[] exists = new boolean[queryArguments.length];
            int existsCounter = 0;

            for (int i = 0; i < exists.length; i++) {
                exists[existsCounter++] = false;
            }

            for (Hobby hobby : hobbies) {
                existsCounter = 0;
                for (int i = 0; i < queryArguments.length; i++) {
                    value = new String(hobby.getName().trim().toLowerCase());
                    test = new String(queryArguments[i].trim().replaceAll("[^a-zA-Z ]", "").toLowerCase());
                    if (value.indexOf(test) != -1) {
                        exists[existsCounter] = true;
                        break;
                    }
                    existsCounter++;
                }
            }

            existsCounter = 0;
            boolean dropIt = true;
            for (int i = 0; i < exists.length; i++) {
                if (!exists[existsCounter++]) {
                    dropIt = false;
                }
            }

            if (dropIt) {
                searchedUsers.add(user);
            }
        }


        return searchedUsers;
    }


    @DeleteMapping(value = "/{id}")
    @PreAuthorize("hasRole('USER')")
    public void deleteEvent(@PathVariable String id) {
        User user = userService.getUser(id);
        List<Conversation> conversations = conversationService.getUserConversations(id);
        List<Message> messages = new ArrayList<>(messageService.getUserMessages(id));
        List<Event> events = eventService.getUserEvents(id);
        List<Group> groups = groupService.getUserGroups(id);

        for (Message message : messages) {
            message.setText("Message was removed");
            message.setCreator(null);
            messageService.save(message);
        }

        for (Conversation conversation : conversations) {
            conversationService.deleteConversation(conversation.getId());
        }

        for (Event event : events) {
            eventService.deleteEvent(event.getId());
        }

        for (Group group : groups) {
            groupService.deleteGroup(group.getId());
        }

        user.setDescription("delted");
        user.setName("deleted");
        user.setHobbies(Arrays.asList());
        user.setEmail("deleted");
        user.setImageUrl("https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fe%2Fe1%2FRemoved.svg%2F861px-Removed.svg.png&f=1");

        userService.save(user);
    }


}

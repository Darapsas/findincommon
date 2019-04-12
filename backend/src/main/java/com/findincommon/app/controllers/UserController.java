package com.findincommon.app.controllers;

import com.findincommon.app.exception.ResourceNotFoundException;
import com.findincommon.app.models.Hobby;
import com.findincommon.app.models.User;
import com.findincommon.app.repository.EventRepository;
import com.findincommon.app.repository.UserRepository;
import com.findincommon.app.security.CurrentUser;
import com.findincommon.app.security.UserPrincipal;
import com.findincommon.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserService userService;

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

    @GetMapping("/hobbies/{hobbies}")
    public List<User> getUsersByHobbies(@PathVariable String query) {
        List<User> searchedUsers = new ArrayList<>();

        for (User user : searchedUsers) {
            List<Hobby> searchedHobbies = new ArrayList<>();

            List<Hobby> hobbies = user.getHobbies();
            String[] queryArguments = query.split(",");

            String value;
            String test;

            outerloop:
            for (Hobby hobby : hobbies) {
                for (int i = 0; i < queryArguments.length; i++) {
                    value = new String(hobby.getName().trim().toLowerCase());
                    test = new String(queryArguments[i].trim().replaceAll("[^a-zA-Z ]", "").toLowerCase());
                    System.out.println(value + " -> " + test);
                    if (value.indexOf(test) != -1) {
                        searchedUsers.add(user);
                        break outerloop;
                    }
                }
            }
        }


        return searchedUsers;
    }
}

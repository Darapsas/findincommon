package com.findincommon.app.controllers;

import com.findincommon.app.exception.ResourceNotFoundException;
import com.findincommon.app.models.User;
import com.findincommon.app.repository.EventRepository;
import com.findincommon.app.repository.UserRepository;
import com.findincommon.app.security.CurrentUser;
import com.findincommon.app.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/user/info")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }
}

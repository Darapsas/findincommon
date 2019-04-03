package com.findincommon.app.controllers;

import com.findincommon.app.models.User;
import com.findincommon.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping
    public void createUser(@RequestBody User user) {
        userService.save(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(value = "/{id}")
    public User getUser(@PathVariable String id) {
        return userService.getUser(id);
    }

    @PutMapping(value = "/{id}")
    public void updateUser(@PathVariable String id, @RequestBody User user) {
        userService.save(user);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

}

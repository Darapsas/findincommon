package com.findincommon.app.controllers;

import com.findincommon.app.models.Hobby;
import com.findincommon.app.models.User;
import com.findincommon.app.repository.HobbyRepository;
import com.findincommon.app.repository.UserRepository;
import com.findincommon.app.services.HobbyService;
import com.findincommon.app.services.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class UserControllerTest {

    @Autowired
    private UserService userService;

    @Autowired
    private HobbyService hobbyService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private HobbyRepository hobbyRepository;

    @Test
    public void updateUser() {
        when(userRepository.findById("12")).thenReturn(Optional.of(
                User
                        .builder()
                        .id("12")
                        .name("Test Test")
                        .imageUrl("test")
                        .description("test description")
                .build()));
        User updatedUser = userService.getUser("12");
        assertEquals("12", updatedUser.getId());

        updatedUser.setImageUrl("sadfasdf");
        assertEquals("sadfasdf", updatedUser.getImageUrl());
        userRepository.save(updatedUser);
        verify(userRepository, times(1)).save(updatedUser);
    }

    @Test
    public void getUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(
                User
                .builder()
                        .id("id")
                        .name("test")
                .build(),
                User
                        .builder()
                        .id("id2")
                        .name("test")
                        .build(),
                User
                        .builder()
                        .id("id3")
                        .name("test")
                        .build()
        ));
        assertEquals(3, userService.getAllUsers().size());
    }

    @Test
    public void addHobbyToUser() {
        String userId = "12";
        String hobbyId = "hobbyId";

        when(userRepository.findById("12")).thenReturn(Optional.of(
                User
                        .builder()
                        .id("12")
                        .name("Test Test")
                        .imageUrl("test")
                        .description("test description")
                        .hobbies(Arrays.asList())
                        .build()));

        User user = userService.getUser(userId);
        assertEquals("12", user.getId());
        List<Hobby> hobbies = new ArrayList<>(user.getHobbies());

        boolean test = false;
        for (Hobby hobby : hobbies) {
            if (hobby.getId().equals(hobbyId)) {
            }
        }

        when(hobbyRepository.findById("hobbyId")).thenReturn(Optional.of(
                Hobby
                        .builder()
                        .id("hobbyId")
                        .build()
        ));

        hobbies.add(hobbyService.getHobby(hobbyId));

        user.setHobbies(hobbies);
        assertEquals("hobbyId", user.getHobbies().get(0).getId());
        userService.save(user);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void removeHobbyFromUser() {
        String userId = "12";
        String hobbyId = "hobbyId";

        when(userRepository.findById("12")).thenReturn(Optional.of(
                User
                        .builder()
                        .id("12")
                        .name("Test Test")
                        .imageUrl("test")
                        .description("test description")
                        .hobbies(Arrays.asList(
                                Hobby.builder().id(hobbyId).build(),
                                Hobby.builder().id("bam").build()
                        ))
                        .build()));

        User user = userService.getUser(userId);
        assertEquals("12", user.getId());

        List<Hobby> hobbies = new ArrayList<>(user.getHobbies());
        hobbies.removeIf(hobby -> hobby.getId().equals(hobbyId));
        user.setHobbies(hobbies);
        assertEquals(1, user.getHobbies().size());
        userService.save(user);
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void getUsersByHobbies() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(
                User
                        .builder()
                        .id("id")
                        .name("test")
                        .hobbies(Arrays.asList(
                                Hobby
                                        .builder()
                                        .id("1")
                                        .name("name")
                                        .build(),
                                Hobby
                                        .builder()
                                        .id("1")
                                        .name("nme")
                                        .build()
                        ))
                        .build(),
                User
                        .builder()
                        .id("id2")
                        .name("test")
                        .hobbies(Arrays.asList(
                                Hobby
                                        .builder()
                                        .id("1")
                                        .name("nme")
                                        .build(),
                                Hobby
                                        .builder()
                                        .id("1")
                                        .name("nme")
                                        .build()
                        ))
                        .build(),
                User
                        .builder()
                        .id("id3")
                        .name("test")
                        .hobbies(Arrays.asList(
                                Hobby
                                        .builder()
                                        .id("1")
                                        .name("nme")
                                        .build(),
                                Hobby
                                        .builder()
                                        .id("1")
                                        .name("na")
                                        .build()
                        ))
                        .build()
        ));
        List<User> users = userService.getAllUsers();
        assertEquals(3, users.size());
        List<User> searchedUsers = new ArrayList<>();

        for (User user : users) {
            List<Hobby> hobbies = user.getHobbies();

            String[] queryArguments = "na".split(",");

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
        assertEquals(2, searchedUsers.size());
    }
}
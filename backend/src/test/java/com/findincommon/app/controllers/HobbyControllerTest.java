package com.findincommon.app.controllers;

import com.findincommon.app.models.Hobby;
import com.findincommon.app.repository.HobbyRepository;
import com.findincommon.app.services.HobbyService;
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
public class HobbyControllerTest {

    @Autowired
    private HobbyService hobbyService;

    @MockBean
    private HobbyRepository hobbyRepository;

    @Test
    public void createHobby() {
        Hobby hobby = Hobby
                .builder()
                .id("123")
                .name("interesting")
                .description("about interesting")
                .build();

        hobbyRepository.save(hobby);
        verify(hobbyRepository, times(1)).save(hobby);
    }

    @Test
    public void getHobbies() {
        when(hobbyRepository.findAll()).thenReturn(Arrays.asList(
                Hobby
                        .builder()
                        .id("1")
                        .name("name")
                        .description("desc")
                        .build(),
                Hobby
                        .builder()
                        .id("2")
                        .name("name2")
                        .description("desc2")
                        .build()
        ));

        assertEquals(2, hobbyService.getAllHobbies().size());
    }

    @Test
    public void getCertainHobbies() {

        when(hobbyRepository.findAll()).thenReturn(Arrays.asList(
                Hobby
                        .builder()
                        .id("1")
                        .name("nam")
                        .description("desc")
                        .build(),
                Hobby
                        .builder()
                        .id("2")
                        .name("name2")
                        .description("desc2")
                        .build(),
                Hobby
                        .builder()
                        .id("3")
                        .name("name3")
                        .description("desc3")
                        .build()
        ));

        List<Hobby> searchedHobbies = new ArrayList<>();

        List<Hobby> hobbies = hobbyService.getAllHobbies();
        System.out.println(hobbies.get(0).getDescription());
        String[] queryArguments = "name".split(",");

        String value;
        String test;

        for (Hobby hobby : hobbies) {
            for (int i = 0; i < queryArguments.length; i++) {
                value = new String(hobby.getName().trim().toLowerCase());
                test = new String(queryArguments[i].trim().replaceAll("[^a-zA-Z ]", "").toLowerCase());
                if (value.indexOf(test) != -1 && !test.isEmpty()) {
                    searchedHobbies.add(hobby);
                    break;
                }
            }
        }

        assertEquals(2, searchedHobbies.size());
    }

    @Test
    public void getHobby() {
        when(hobbyRepository.findById("123")).thenReturn(Optional.of(
                Hobby
                        .builder()
                        .id("123")
                        .name("interesting")
                        .description("about interesting")
                        .build()));
        assertEquals("123", hobbyService.getHobby("123").getId());
    }

    @Test
    public void updateHobby() {
        Hobby hobby = Hobby
                .builder()
                .id("123")
                .name("interesting")
                .description("about interesting")
                .build();

        hobbyRepository.save(hobby);
        verify(hobbyRepository, times(1)).save(hobby);
    }

    @Test
    public void deleteHobby() {
        Hobby hobby = Hobby
                .builder()
                .id("123")
                .name("interesting")
                .description("about interesting")
                .build();

        hobbyService.deleteHobby(hobby.getId());
        verify(hobbyRepository, times(1)).deleteById(hobby.getId());
    }
}
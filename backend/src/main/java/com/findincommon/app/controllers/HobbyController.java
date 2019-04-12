package com.findincommon.app.controllers;

import com.findincommon.app.models.Hobby;
import com.findincommon.app.services.HobbyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/hobbies")
public class HobbyController {

    @Autowired
    HobbyService hobbyService;

    @PostMapping
    public void createHobby(@RequestBody Hobby hobby) {
        hobbyService.save(
                Hobby
                        .builder()
                        .name(hobby.getName())
                        .description(hobby.getDescription())
                        .build());
    }

    @GetMapping
    public List<Hobby> getHobbies() {
        return hobbyService.getAllHobbies();
    }

    @GetMapping(value = "/search/{query}")
    public List<Hobby> getCertainHobbies(@PathVariable String query) {
        List<Hobby> searchedHobbies = new ArrayList<>();

        List<Hobby> hobbies = hobbyService.getAllHobbies();
        String[] queryArguments = query.split(",");

        String value;
        String test;

        for (Hobby hobby : hobbies) {
            for (int i = 0; i < queryArguments.length; i++) {
                value = new String(hobby.getName().trim().toLowerCase());
                test = new String(queryArguments[i].trim().replaceAll("[^a-zA-Z ]", "").toLowerCase());
                System.out.println(value + " -> " + test);
                if (value.indexOf(test) != -1 && !test.isEmpty()) {
                    searchedHobbies.add(hobby);
                    break;
                }
            }
        }


        return searchedHobbies;
    }


    @GetMapping(value = "/{id}")
    public Hobby getHobby(@PathVariable String id) {
        return hobbyService.getHobby(id);
    }

    @PutMapping(value = "/{id}")
    public void updateHobby(@PathVariable String id, @RequestBody Hobby hobby) {
        hobbyService.save(
                Hobby
                        .builder()
                        .id(id)
                        .name(hobby.getName())
                        .description(hobby.getDescription())
                        .build());
    }

    @DeleteMapping(value = "/{id}")
    public void deleteHobby(@PathVariable String id) {
        hobbyService.deleteHobby(id);
    }

}

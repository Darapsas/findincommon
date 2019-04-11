package com.findincommon.app.controllers;

import com.findincommon.app.models.Hobby;
import com.findincommon.app.services.HobbyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

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
        List<Hobby> hobbies = hobbyService.getAllHobbies();
        List<String> queryArguments = Arrays.asList(query.split(","));
        System.out.print(query);

        List<Hobby> searchedHobbies = new ArrayList<>();// = hobbies.stream().map(hobby -> return hobby.getName().contains("adsf")).collect(Collectors.toList());

        for (Hobby hobby : hobbies) {
            for (String queryArgument : queryArguments) {
                if (hobby.getName().contains(queryArgument.trim())) {
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

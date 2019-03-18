package com.findincommon.app.controllers;

import com.findincommon.app.models.Hobby;
import com.findincommon.app.services.HobbyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hobbies")
public class HobbyController {

    @Autowired
    HobbyService hobbyService;

    @PostMapping
    public void createHobby(@RequestBody Hobby hobby) {
        hobbyService.save(hobby);
    }

    @GetMapping
    public List<Hobby> getHobbys() {
        return hobbyService.getAllHobbys();
    }

    @GetMapping(value = "/{id}")
    public Hobby getHobby(@PathVariable String id) {
        return hobbyService.getHobby(id);
    }

    @PutMapping(value = "/{id}")
    public void updateHobby(@PathVariable String id, @RequestBody Hobby hobby) {
        hobbyService.save(hobby);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteHobby(@PathVariable String id) {
        hobbyService.deleteHobby(id);
    }

}

package com.findincommon.app.controllers;

import com.findincommon.app.models.Group;
import com.findincommon.app.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    GroupService groupService;

    @PostMapping
    public void createGroup(@RequestBody Group group) {
        groupService.save(group);
    }

    @GetMapping
    public List<Group> getGroups() {
        return groupService.getAllGroups();
    }

    @GetMapping(value = "/{id}")
    public Group getGroup(@PathVariable String id) {
        return groupService.getGroup(id);
    }

    @PutMapping(value = "/{id}")
    public void updateGroup(@PathVariable String id, @RequestBody Group group) {
        groupService.save(group);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteGroup(@PathVariable String id) {
        groupService.deleteGroup(id);
    }

}

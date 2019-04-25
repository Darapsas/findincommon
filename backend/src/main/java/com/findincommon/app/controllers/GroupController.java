package com.findincommon.app.controllers;

import com.findincommon.app.models.Group;
import com.findincommon.app.models.User;
import com.findincommon.app.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/groups")
public class GroupController {

    @Autowired
    GroupService groupService;

    @PostMapping
    public void createGroup(@RequestBody Group group) {
        groupService.save(
                Group
                .builder()
                        .name(group.getName())
                        .creator(group.getCreator())
                        .members(group.getMembers())
                        .description(group.getDescription())
                        .conversationId(group.getConversationId())
                        .build());
    }

    @GetMapping(value = "/user/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Group> getUserGroups(@PathVariable String id) {
        List<Group> userGroups = new ArrayList<>();
        List<Group> groups = groupService.getAllGroups();

        String creator;

        for (Group group : groups) {
            creator = group.getCreator().getId();
            for (User participant : group.getMembers()) {
                if (participant.getId().equals(id) && !participant.getId().equals(creator)) {
                    userGroups.add(group);
                    break;
                }
            }
        }

        return userGroups;
    }

    @GetMapping(value = "/creator/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Group> getUserCreatedGroups(@PathVariable String id) {
        List<Group> userGroups = new ArrayList<>();
        List<Group> groups = groupService.getAllGroups();

        for (Group group : groups) {
            if (group.getCreator().getId().equals(id)) {
                userGroups.add(group);
            }
        }

        return userGroups;
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

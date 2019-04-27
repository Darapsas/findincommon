package com.findincommon.app.services;


import com.findincommon.app.models.Group;
import com.findincommon.app.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    public void save(Group group) {
        groupRepository.save(group);
    }

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    public List<Group> getUserGroups(String id) {
        return groupRepository.findByCreatorId(id);
    }

    public Group getGroup(String id) {
        return groupRepository.findById(id).get();
    }

    public void deleteGroup(String id) {
        groupRepository.deleteById(id);
    }

}

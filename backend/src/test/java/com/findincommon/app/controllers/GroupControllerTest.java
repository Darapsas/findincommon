package com.findincommon.app.controllers;

import com.findincommon.app.models.Group;
import com.findincommon.app.models.User;
import com.findincommon.app.repository.GroupRepository;
import com.findincommon.app.services.GroupService;
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
public class GroupControllerTest {

    @Autowired
    private GroupService groupService;

    @MockBean
    private GroupRepository groupRepository;

    @Test
    public void createGroup() {
        Group group = Group
                .builder()
                .id("123")
                .members(Arrays.asList())
                .conversationId("12")
                .creator(null)
                .description("test")
                .name("test")
                .build();

        groupRepository.save(group);

        verify(groupRepository, times(1)).save(group);
    }

    @Test
    public void getUserGroups() {

        String id = "code";
        when(groupRepository.findAll()).thenReturn(Arrays.asList(
                Group
                        .builder()
                        .id("123")
                        .name("group")
                        .description("group desc")
                        .creator(
                                User
                                        .builder()
                                        .id("code")
                                        .build())
                        .members(Arrays.asList(User.builder().id("cddode").build()))
                        .conversationId("jl4k32jrlkflkjrflsjadklf")
                        .build(),
                Group
                        .builder()
                        .id("12")
                        .name("group2")
                        .description("group desc2")
                        .creator(
                                User
                                        .builder()
                                        .id("bla")
                                        .build())
                        .members(Arrays.asList(User.builder().id("cddode").build()))
                        .conversationId("jl4kasdfrlkflkjrflsjadklf")
                        .build(),
                Group
                        .builder()
                        .id("123")
                        .name("group")
                        .description("group desc")
                        .creator(
                                User
                                        .builder()
                                        .id("bla")
                                        .build())
                        .members(Arrays.asList(User.builder().id("code").build()))
                        .conversationId("jl4k32jrlkflkjrflsjadklf")
                        .build()
        ));

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
        assertEquals(1, userGroups.size());
    }

    @Test
    public void getUserCreatedGroups() {
        String id = "code";
        when(groupRepository.findAll()).thenReturn(Arrays.asList(
                Group
                        .builder()
                        .id("123")
                        .name("group")
                        .description("group desc")
                        .creator(
                                User
                                        .builder()
                                        .id("code")
                                        .build())
                        .members(Arrays.asList())
                        .conversationId("jl4k32jrlkflkjrflsjadklf")
                        .build(),
                Group
                        .builder()
                        .id("12")
                        .name("group2")
                        .description("group desc2")
                        .creator(
                                User
                                        .builder()
                                        .id("code3")
                                        .build())
                        .members(Arrays.asList())
                        .conversationId("jl4kasdfrlkflkjrflsjadklf")
                        .build(),
                Group
                        .builder()
                        .id("123")
                        .name("group")
                        .description("group desc")
                        .creator(
                                User
                                        .builder()
                                        .id("code")
                                        .build())
                        .members(Arrays.asList())
                        .conversationId("jl4k32jrlkflkjrflsjadklf")
                        .build()
        ));

        List<Group> userGroups = new ArrayList<>();
        List<Group> groups = groupService.getAllGroups();

        for (Group group : groups) {
            if (group.getCreator().getId().equals(id)) {
                userGroups.add(group);
            }
        }

        assertEquals(2, userGroups.size());
    }

    @Test
    public void getGroups() {
        when(groupRepository.findAll()).thenReturn(Arrays.asList(
                Group
                        .builder()
                        .id("123")
                        .name("group")
                        .description("group desc")
                        .creator(null)
                        .members(Arrays.asList())
                        .conversationId("jl4k32jrlkflkjrflsjadklf")
                        .build(),
                Group
                        .builder()
                        .id("12")
                        .name("group2")
                        .description("group desc2")
                        .creator(null)
                        .members(Arrays.asList())
                        .conversationId("jl4kasdfrlkflkjrflsjadklf")
                        .build()
        ));
        assertEquals(2, groupService.getAllGroups().size());
    }

    @Test
    public void getGroup() {
        String id = "123";
        when(groupRepository.findById(id)).thenReturn(Optional.of(Group
                .builder()
                .id("123")
                .members(Arrays.asList())
                .conversationId("12")
                .creator(null)
                .description("test")
                .name("test")
                .build()));
        assertEquals("123", groupService.getGroup(id).getId());
    }

    @Test
    public void updateGroup() {
        Group group = Group
                .builder()
                .id("123")
                .members(Arrays.asList())
                .conversationId("12")
                .creator(null)
                .description("test")
                .name("test")
                .build();

        groupRepository.save(group);
        verify(groupRepository, times(1)).save(group);
    }

    @Test
    public void deleteGroup() {
        Group group = Group
                .builder()
                .id("123")
                .members(Arrays.asList())
                .conversationId("12")
                .creator(null)
                .description("test")
                .name("test")
                .build();

        groupService.deleteGroup(group.getId());
        verify(groupRepository, times(1)).deleteById(group.getId());
    }
}
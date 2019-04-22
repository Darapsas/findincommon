package com.findincommon.app.controllers;

import com.findincommon.app.models.Conversation;
import com.findincommon.app.models.ConversationHelper;
import com.findincommon.app.models.User;
import com.findincommon.app.services.ConversationService;
import com.findincommon.app.services.MessageService;
import com.findincommon.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @Autowired
    ConversationService conversationService;
    @Autowired
    UserService userService;
    @Autowired
    MessageService messageService;

    @PostMapping
    public void createConversation(@RequestBody Conversation conversation
    ) {
        conversationService.save(
                Conversation
                        .builder()
                        .name(conversation.getName())
                        .participants(conversation.getParticipants())
                        .creator(conversation.getCreator())
                        .build()
        );
    }

    @GetMapping
    public List<Conversation> getConversations() {
        return conversationService.getAllConversations();
    }


    @GetMapping(value = "/user/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Conversation> getUserConversations(@PathVariable String id) {
        List<Conversation> userConversations = new ArrayList<>();
        List<Conversation> conversations = conversationService.getAllConversations();

        String creator;

        for (Conversation conversation : conversations) {
            creator = conversation.getCreator().getId();
            for (User participant : conversation.getParticipants()) {
                if (participant.getId().equals(id) && !participant.getId().equals(creator)) {
                    userConversations.add(conversation);
                    break;
                }
            }
        }

        return userConversations;
    }

    @GetMapping(value = "/creator/{id}")
    @PreAuthorize("hasRole('USER')")
    public List<Conversation> getUserCreatedConversations(@PathVariable String id) {
        List<Conversation> userConversations = new ArrayList<>();
        List<Conversation> conversations = conversationService.getAllConversations();

        for (Conversation conversation : conversations) {
            System.out.println(conversation.getCreator());
            if (conversation.getCreator().getId().equals(id)) {
                userConversations.add(conversation);
            }
        }

        return userConversations;
    }


    @GetMapping(value = "/{id}")
    public Conversation getConversation(@PathVariable String id) {
        return conversationService.getConversation(id);
    }

    @PutMapping(value = "/{id}")
    public void updateConversation(@PathVariable String id, @RequestBody Conversation conversation) {
        conversationService.save(conversation);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteConversation(@PathVariable String id) {
        conversationService.deleteConversation(id);
    }

}

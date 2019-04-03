package com.findincommon.app.controllers;

import com.findincommon.app.models.Conversation;
import com.findincommon.app.models.ConversationHelper;
import com.findincommon.app.services.ConversationService;
import com.findincommon.app.services.MessageService;
import com.findincommon.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public void createConversation(@RequestBody ConversationHelper conversationHelper) {
        conversationService.save(
                Conversation
                        .builder()
                        .name(conversationHelper.getName())
                        .participants(conversationHelper
                                .getUsersIds()
                                .stream()
                                .map(user -> userService.getUser(user))
                                .collect(Collectors.toList()))
                        /*.messages(conversationHelper
                                .getMessagesIds()
                                .stream()
                                .map(message -> messageService.getMessage(message))
                                .collect(Collectors.toList()))*/
                        .build());
    }

    @GetMapping
    public List<Conversation> getConversations() {
        return conversationService.getAllConversations();
    }

    @GetMapping(value = "/{id}")
    public Conversation getConversation(@PathVariable String id) {
        return conversationService.getConversation(id);
    }

    @PutMapping(value = "/{id}")
    public void updateConversation(@PathVariable String id, @RequestBody ConversationHelper conversationHelper) {
        conversationService.save(
                Conversation
                        .builder()
                        .id(id)
                        .name(conversationHelper.getName())
                        .participants(conversationHelper
                                .getUsersIds()
                                .stream()
                                .map(user -> userService.getUser(user))
                                .collect(Collectors.toList()))
                     /*   .messages(conversationHelper
                                .getMessagesIds()
                                .stream()
                                .map(message -> messageService.getMessage(message))
                                .collect(Collectors.toList()))*/
                        .build());
    }

    @DeleteMapping(value = "/{id}")
    public void deleteConversation(@PathVariable String id) {
        conversationService.deleteConversation(id);
    }

}

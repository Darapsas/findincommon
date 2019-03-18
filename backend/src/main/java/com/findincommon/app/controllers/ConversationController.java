package com.findincommon.app.controllers;

import com.findincommon.app.models.Conversation;
import com.findincommon.app.services.ConversationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    @Autowired
    ConversationService conversationService;

    @PostMapping
    public void createConversation(@RequestBody Conversation conversation) {
        conversationService.save(conversation);
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
    public void updateConversation(@PathVariable String id, @RequestBody Conversation conversation) {
        conversationService.save(conversation);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteConversation(@PathVariable String id) {
        conversationService.deleteConversation(id);
    }

}

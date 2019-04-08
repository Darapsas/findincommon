package com.findincommon.app.controllers;

import com.findincommon.app.models.Message;
import com.findincommon.app.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    MessageService messageService;

    @PostMapping
    public void createMessage(@RequestBody Message message) {
        messageService.save(message);
    }

    @GetMapping
    public List<Message> getMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping(value = "/{id}")
    public Message getMessage(@PathVariable String id) {
        return messageService.getMessage(id);
    }

    @PutMapping(value = "/{id}")
    public void updateMessage(@PathVariable String id, @RequestBody Message message) {
        messageService.save(message);
    }

    @DeleteMapping(value = "/{id}")
    public void deleteMessage(@PathVariable String id) {
        messageService.deleteMessage(id);
    }

}
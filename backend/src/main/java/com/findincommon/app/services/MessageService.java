package com.findincommon.app.services;


import com.findincommon.app.models.Message;
import com.findincommon.app.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public void save(Message message) {
        messageRepository.save(message);
    }

    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }
    public List<Message> getUserMessages(String id) {
        return messageRepository.findByCreatorId(id);
    }

    public List<Message> getConversationMessages(String id ) {
        return messageRepository.findByConversation(id);
    }

    public Message getMessage(String id) {
        return messageRepository.findById(id).get();
    }

    public void deleteMessage(String id) {
        messageRepository.deleteById(id);
    }

}

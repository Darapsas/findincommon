package com.findincommon.app.services;

import com.findincommon.app.models.Conversation;
import com.findincommon.app.repository.ConversationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationService {

    @Autowired
    private ConversationRepository conversationRepository;

    public void save(Conversation conversation) {
        conversationRepository.save(conversation);
    }

    public List<Conversation> getAllConversations() {
        return conversationRepository.findAll();
    }
    public List<Conversation> getUserConversations(String id) {
        return conversationRepository.findByCreatorId(id);
    }

    public Conversation getConversation(String id) {
        return conversationRepository.findById(id).get();
    }

    public Conversation getConversationByName(String name) {
        return conversationRepository.findByName(name);
    }

    public void deleteConversation(String id) {
        conversationRepository.deleteById(id);
    }

}

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

    public Conversation getConversation(String id) {
        return conversationRepository.findById(id).get();
    }

    public void deleteConversation(String id) {
        conversationRepository.deleteById(id);
    }

}

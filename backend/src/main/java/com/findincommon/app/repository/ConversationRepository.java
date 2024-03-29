package com.findincommon.app.repository;

import com.findincommon.app.models.Conversation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConversationRepository extends MongoRepository<Conversation, String> {
    //List<Conversation> findByConversationId(String id);
    Conversation findByName(String name);
    List<Conversation> findByCreatorId(String id);
}
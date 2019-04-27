package com.findincommon.app.repository;

import com.findincommon.app.models.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    List<Message> findByConversation(String id);
    List<Message> findByCreatorId(String id);
}

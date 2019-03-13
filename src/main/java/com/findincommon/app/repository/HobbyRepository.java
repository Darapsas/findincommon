package com.findincommon.app.repository;

import com.findincommon.app.models.Hobby;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HobbyRepository extends MongoRepository<Hobby, String> {
    List<Hobby> findByHobbyId(String id);
}

package com.findincommon.app.repository;

import com.findincommon.app.models.Hobby;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HobbyRepository extends MongoRepository<Hobby, String> {
}

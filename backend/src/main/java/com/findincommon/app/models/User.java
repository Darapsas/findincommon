package com.findincommon.app.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id;
/*    @DBRef
    private List<Hobby> hobbies;
    @DBRef
    private List<Event> events;
    @DBRef
    private List<Event> conversations;
    @DBRef
    private List<Group> groups;*/
    private String firstName;
    private String lastName;
    private String email;
    private String emailVerification;
    private String photo;
    private String password;
    private AuthProvider provider;
    private String providerId;
}

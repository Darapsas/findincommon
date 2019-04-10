package com.findincommon.app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Builder
@Document(collection = "users")
public class User {
/*    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String birthdate;*/

    public enum Role {USER, ADMIN, USER_MANAGER}

    @Id
    private String id;
    private String name;
    @Email
    private String email;
    @JsonIgnore
    private String password;
    private String imageUrl;
    private String providerId;
    private Boolean emailVerified;
    @NotNull
    private AuthProvider provider;

    @DBRef
    private List<Hobby> hobbies;

}
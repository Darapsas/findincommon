package com.findincommon.app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

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
    private String imageUrl;
    private Boolean emailVerified;
    @JsonIgnore
    private String password;
    @NotNull
    private AuthProvider provider;
    private String providerId;

}
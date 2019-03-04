package com.findincommon.app.services;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class DefaultUserDetails implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return mockUser(username);
    }

    private UserDetails mockUser(String username) {
        String userName = "test@test.com";
        String userPass = "{noop}tester";

        if (!userName.equals(username)) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }

        UserDetails user = User.withDefaultPasswordEncoder()
                .username(username)
                .password(userPass)
                .authorities(getAuthority())
                .build();

        return user;
    }

    private List<SimpleGrantedAuthority> getAuthority() {
        return Collections.emptyList();
    }

}

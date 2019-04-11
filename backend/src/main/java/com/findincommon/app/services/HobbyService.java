package com.findincommon.app.services;

import com.findincommon.app.models.Hobby;
import com.findincommon.app.repository.HobbyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HobbyService {

    @Autowired
    private HobbyRepository hobbyRepository;

    public void save(Hobby hobby) {
        hobbyRepository.save(hobby);
    }

    public List<Hobby> getAllHobbies() {
        return hobbyRepository.findAll();
    }

    public Hobby getHobby(String id) {
        return hobbyRepository.findById(id).get();
    }

    public void deleteHobby(String id) {
        hobbyRepository.deleteById(id);
    }

}

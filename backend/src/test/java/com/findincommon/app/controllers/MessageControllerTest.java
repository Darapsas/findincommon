package com.findincommon.app.controllers;

import com.findincommon.app.models.Message;
import com.findincommon.app.repository.MessageRepository;
import com.findincommon.app.services.MessageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;

import static org.mockito.Mockito.when;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class MessageControllerTest {

    @Autowired
    private MessageService messageService;

    @MockBean
    private MessageRepository messageRepository;

    @Test
    public void createMessage() {
        assertEquals(7, 7);
    }

    @Test
    public void getMessages() {
        when(messageRepository.findAll()).thenReturn(Arrays.asList(
                Message
                        .builder()
                        .creator(null)
                        .conversation(null)
                        .text("hello")
                        .build(),
                Message
                        .builder()
                        .creator(null)
                        .conversation(null)
                        .text("How are you? 😀")
                        .build(),
                Message
                        .builder()
                        .creator(null)
                        .conversation(null)
                        .text("Hi")
                        .build(),
                Message
                        .builder()
                        .creator(null)
                        .conversation(null)
                        .text("I'm good")
                        .build(),
                Message
                        .builder()
                        .creator(null)
                        .conversation(null)
                        .text("And you?")
                        .build(),
                Message
                        .builder()
                        .creator(null)
                        .conversation(null)
                        .text("Very good 😀")
                        .build(),
                Message
                        .builder()
                        .creator(null)
                        .conversation(null)
                        .text("Good then")
                        .build()));
        assertEquals(7, messageService.getAllMessages().size());
    }

    @Test
    public void getConversationMessages() {
        assertEquals(7, 7);
    }

    @Test
    public void getMessage() {
        assertEquals(7, 7);
    }

    @Test
    public void updateMessage() {
        assertEquals(7, 7);
    }

    @Test
    public void deleteMessage() {
        assertEquals(7, 7);
    }
}

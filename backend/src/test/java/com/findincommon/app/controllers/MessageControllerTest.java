package com.findincommon.app.controllers;

import com.findincommon.app.models.Message;
import com.findincommon.app.repository.MessageRepository;
import com.findincommon.app.services.MessageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@RunWith(SpringRunner.class)
@ActiveProfiles("test")
@SpringBootTest
public class MessageControllerTest {

    @Autowired
    private MessageService messageService;

    @MockBean
    private MessageRepository messageRepository;

    @Test
    public void getMessage() {
        String id = "1234";
        when(messageRepository.findById(id)).thenReturn(Optional.of(
                Message
                        .builder()
                        .id("1234")
                        .creator(null)
                        .conversation(null)
                        .text("hello")
                        .build()));
        assertEquals("1234", messageService.getMessage(id).getId());
    }

    @Test
    public void createMessage() {
        Message message = Message
                .builder()
                .id("123")
                .creator(null)
                .conversation(null)
                .text("some text")
                .build();

        messageRepository.save(message);

        verify(messageRepository, times(1)).save(message);
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
        String conversationId = "123asdfasdfa2134sdfasdf214";
        when(messageRepository.findByConversation(conversationId)).thenReturn(Arrays.asList(
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
                        .build()));
        assertEquals(2, messageService.getConversationMessages(conversationId).size());
    }

    @Test
    public void updateMessage() {
        Message message = Message
                .builder()
                .id("123")
                .creator(null)
                .conversation(null)
                .text("some text")
                .build();

        messageRepository.save(message);

        verify(messageRepository, times(1)).save(message);
    }

    @Test
    public void deleteMessage() {
        Message message = Message
                .builder()
                .id("123")
                .creator(null)
                .conversation(null)
                .text("some text")
                .build();
        messageService.deleteMessage(message.getId());
        verify(messageRepository, times(1)).deleteById(message.getId());
    }
}

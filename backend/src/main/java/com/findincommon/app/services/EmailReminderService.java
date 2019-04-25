package com.findincommon.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


@Service
public class EmailReminderService {
    private JavaMailSender javaMailSender;

    @Autowired
    public EmailReminderService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Async("threadPoolTaskExecutor")
    public void sendEmailReminder(String userEmail, String userName, String reminderName, String eventName) throws MailException, InterruptedException {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(userEmail);
        mail.setFrom("info@findincommon.com");
        mail.setSubject("Event reminder (" + reminderName + ") " + eventName);
        mail.setText("This is an automatically sent email for events. For user: " + userName);
        javaMailSender.send(mail);
        System.out.println("EmailSender: email sent");
    }
}

package com.findincommon.app;

import com.findincommon.app.models.Conversation;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppApplication {

	public static void main(String[] args) {
	    System.out.println("Hello world");
		Conversation con = new Conversation("this", "that");

		SpringApplication.run(AppApplication.class, args);
	}

}

package com.findincommon.app;

import com.findincommon.app.controllers.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(Suite.class)
@ActiveProfiles("test")
@Suite.SuiteClasses({
		HobbyControllerTest.class,
		MessageControllerTest.class,
		GroupControllerTest.class,
		ReminderControllerTest.class,
		EventControllerTest.class,
		UserControllerTest.class
})
public class AppApplicationTests {

	@Test
	public void contextLoads() {
	}

}

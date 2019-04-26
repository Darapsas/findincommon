package com.findincommon.app;

import com.findincommon.app.controllers.MessageControllerTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(Suite.class)
@Suite.SuiteClasses({
		MessageControllerTest.class
})
public class AppApplicationTests {

	@Test
	public void contextLoads() {
	}

}

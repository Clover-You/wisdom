package top.ctong.wisdom.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class WisdomUserApplication {

	public static void main(String[] args) {
		var app = SpringApplication.run(WisdomUserApplication.class, args);
		System.out.println(app);
	}

}

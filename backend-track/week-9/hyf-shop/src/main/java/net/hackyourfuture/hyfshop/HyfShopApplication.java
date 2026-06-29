package net.hackyourfuture.hyfshop;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class HyfShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(HyfShopApplication.class, args);
	}

}

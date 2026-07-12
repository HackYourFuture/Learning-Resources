package net.hackyourfuture.simple;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
public class SimpleController {
    private static final Random RANDOM = new Random();

    @GetMapping("")
    public String helloWorld() {
        return "Hello world!";
    }

    @GetMapping("/random")
    public Long randomNumber() {
        return RANDOM.nextLong();
    }

    @PostMapping("")
    public String postTest(@RequestBody String data) {
        if(data == null) {
            return "Thank you for sending nothing";
        }
        return "Thank you for sending:\n"+ data;
    }
}

package top.ctong.wisdom.user;

import cn.hutool.jwt.JWTUtil;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

/**
 * █████▒█      ██  ▄████▄   ██ ▄█▀     ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒      ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░      ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄      ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄     ██████╔╝╚██████╔╝╚██████╔╝
 * ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒     ╚═════╝  ╚═════╝  ╚═════╝
 * ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
 * ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
 * ░     ░ ░      ░  ░
 * Copyright 2023 Clover You.
 * <p>
 * 糊涂 JWT 测试
 * </p>
 *
 * @author Clover
 * @date 2023-06-29 11:54
 */
@Slf4j
@SpringBootTest
public class HutoolJwtTests {

    @DisplayName("创建 jwt")
    @Test
    void create() {
        Map<String, Object> map = new HashMap<String, Object>() {
            private static final long serialVersionUID = 1L;

            {
                put("uid", Integer.parseInt("123"));
                put("expire_time", System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 15);
            }
        };


        log.info(
            JWTUtil.createToken(map, "1234".getBytes())
        );
    }

    @DisplayName("验证jwt")
    @Test
    void verify() {
        assert JWTUtil.verify("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNjc0MzA2MTk5Nzk0Nzc4MTE0IiwiZXhwIjoxNjg4MDIzMTA4LCJpYXQiOjE2ODgwMjEzMDh9.D9zMZhX7J9RAgnUR9VXpmRNPa8dQwWkCqaUZsIb-fXM", "2cdc4c5a3d2541378b13fa8a206d393d".getBytes());
    }

    @Test
    void parse() {
        var jwt = JWTUtil.parseToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEyMywiZXhwaXJlX3RpbWUiOjE2ODkzMDcwOTkyMDV9.nX6L5YmPH0Pbv3KvCNzEVYKXhAV8Jvf6LYVf-sTyAPQ");
        log.info("jwt {}", jwt);
    }
}

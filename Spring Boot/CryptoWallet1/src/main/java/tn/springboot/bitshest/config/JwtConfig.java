package tn.springboot.bitshest.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {

    @Value("00bitchest0101")
    private String secretKey;

    @Value("3600")
    private long expirationTime;

    public String getSecretKey() {
        return secretKey;
    }

    public long getExpirationTime() {
        return expirationTime;
    }
}

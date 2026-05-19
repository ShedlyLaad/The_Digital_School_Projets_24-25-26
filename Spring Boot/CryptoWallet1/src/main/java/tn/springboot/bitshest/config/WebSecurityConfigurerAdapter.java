// package tn.springboot.bitshest.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig extends WebSecurityConfigurerAdapter {
//     @Override
//     protected void configure(HttpSecurity http) throws Exception {
//         http.csrf().disable()
//                 .authorizeRequests()
//                 .antMatchers("/login", "/token").permitAll() // Exclude login and token endpoints from authentication
//                 .anyRequest().authenticated();
//     }
// }
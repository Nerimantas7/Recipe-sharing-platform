package lt.receptai.rsp.config;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.security.JwtAuthenticationEntryPoint;
import lt.receptai.rsp.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@AllArgsConstructor
public class SpringSecurityConfig {

    private UserDetailsService userDetailsService;

    private JwtAuthenticationEntryPoint authenticationEntryPoint;

    private JwtAuthenticationFilter authenticationFilter;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.csrf((csrf) -> csrf.disable())
                .cors(Customizer.withDefaults())
                .headers(headers -> headers.frameOptions().sameOrigin())
                .authorizeHttpRequests((authorize) ->{
                    authorize.requestMatchers("/api/auth/**").permitAll();
                    authorize.requestMatchers("/api/comments/**").permitAll();
                    authorize.requestMatchers("/api/recipes/**").permitAll();
                    authorize.requestMatchers("/api/categories/**").permitAll();
                    authorize.requestMatchers("/h2-console/**").permitAll(); // allows to achieve H2-console
                    authorize.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll();

                    authorize.requestMatchers("/api/categories/add-category").hasRole("ADMIN");

//                    authorize.anyRequest().permitAll();
                    authorize.anyRequest().authenticated();
                }).httpBasic(Customizer.withDefaults());

        http.exceptionHandling(exception -> exception
                .authenticationEntryPoint(authenticationEntryPoint));

        http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}

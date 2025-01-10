package lt.receptai.rsp.service.impl;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.JwtAuthResponse;
import lt.receptai.rsp.dto.LoginDto;
import lt.receptai.rsp.dto.RegisterDto;
import lt.receptai.rsp.entity.Role;
import lt.receptai.rsp.entity.RoleType;
import lt.receptai.rsp.entity.User;
import lt.receptai.rsp.exception.RecipeAPIException;
import lt.receptai.rsp.exception.ResourceNotFoundException;
import lt.receptai.rsp.repository.RoleRepository;
import lt.receptai.rsp.repository.UserRepository;
import lt.receptai.rsp.security.JwtTokenProvider;
import lt.receptai.rsp.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;

    private RoleRepository roleRepository;

    private PasswordEncoder passwordEncoder;

    private AuthenticationManager authenticationManager;

    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String register(RegisterDto registerDto) {

        //check username is already exists in database
        if(userRepository.existsByUsername(registerDto.getUsername())){
            throw new RecipeAPIException(HttpStatus.BAD_REQUEST, "Username already exists!");
        }

        //Check email is already exists in database
        if(userRepository.existsByEmail(registerDto.getEmail())){
            throw new RecipeAPIException(HttpStatus.BAD_REQUEST, "Email already exists!");
        }

        User user = new User();
        user.setName(registerDto.getName());
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        // Assign default roles
        Role userRole = roleRepository.findByName(RoleType.ROLE_USER);

        user.getRoles().add(userRole);

        userRepository.save(user);

        return "User registered successfully!";
    }

    @Override
    public JwtAuthResponse login(LoginDto loginDto) {

        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(),
                loginDto.getPassword()
        ));

        // Set authentication in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Generate the JWT token
        String token = jwtTokenProvider.generateToken(authentication);

        // Retrieve the user's role (assuming a single role per user)
        // Get RoleType directly
        RoleType roleType = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail()).flatMap(user -> user.getRoles().stream()
                        .findFirst()
                        .map(Role::getName))
                .orElse(null);

        JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
        jwtAuthResponse.setRole(roleType);
        jwtAuthResponse.setAccessToken(token);

        return jwtAuthResponse;
    }
}

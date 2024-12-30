package lt.receptai.rsp.service.impl;

import lt.receptai.rsp.dto.RegisterDto;
import lt.receptai.rsp.repository.UserRepository;
import lt.receptai.rsp.service.AuthService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;

//    private Role

    @Override
    public String register(RegisterDto registerDto) {
        return null;
    }
}

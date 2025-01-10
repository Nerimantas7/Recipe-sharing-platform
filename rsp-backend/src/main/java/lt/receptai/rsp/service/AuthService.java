package lt.receptai.rsp.service;

import lt.receptai.rsp.dto.JwtAuthResponse;
import lt.receptai.rsp.dto.LoginDto;
import lt.receptai.rsp.dto.RegisterDto;

public interface AuthService {

    String register (RegisterDto registerDto);

    JwtAuthResponse login(LoginDto loginDto);
}

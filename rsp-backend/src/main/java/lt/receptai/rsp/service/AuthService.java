package lt.receptai.rsp.service;

import lt.receptai.rsp.dto.RegisterDto;

public interface AuthService {
    String register (RegisterDto registerDto);
}

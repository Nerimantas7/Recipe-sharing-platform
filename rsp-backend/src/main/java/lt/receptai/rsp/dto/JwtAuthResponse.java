package lt.receptai.rsp.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.receptai.rsp.entity.RoleType;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthResponse {

    private String accessToken;

    private String tokenType = "Bearer";

    private RoleType role;
}

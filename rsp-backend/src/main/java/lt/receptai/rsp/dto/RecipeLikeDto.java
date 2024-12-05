package lt.receptai.rsp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.receptai.rsp.entity.Recipe;
import lt.receptai.rsp.entity.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeLikeDto {

    private Long id;
    private Long recipeId;
    private Long userId;
    private Boolean liked;
}

package lt.receptai.rsp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.receptai.rsp.entity.Recipe;
import lt.receptai.rsp.entity.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeCommentDto {

    private Long id;
    private String recipeComment;
    private Long recipeId;
    private Long userId;
    private String username;
}

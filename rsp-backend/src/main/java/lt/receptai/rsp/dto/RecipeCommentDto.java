package lt.receptai.rsp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lt.receptai.rsp.entity.Recipe;
import lt.receptai.rsp.entity.User;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeCommentDto {

    private Long id;
    @NotBlank(message = "Comment cannot be blank")
    private String recipeComment;

    @NotNull(message = "Recipe ID is required")
    private Long recipeId;

    @NotNull(message = "User ID is required")
    private Long userId;
}

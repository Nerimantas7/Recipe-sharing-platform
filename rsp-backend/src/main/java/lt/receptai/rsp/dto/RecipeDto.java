package lt.receptai.rsp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.receptai.rsp.entity.RecipeCategory;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDto {
    private Long id;
    private String recipeName;
    private String recipeIngredients;
    private String recipeSteps;
    private byte[] recipeImage;
    private Long categoryId;

}

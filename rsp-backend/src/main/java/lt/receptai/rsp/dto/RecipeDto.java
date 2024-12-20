package lt.receptai.rsp.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.receptai.rsp.entity.RecipeCategory;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDto {

    private Long id;

    @NotNull(message = "Recipe name must not be null.")
    @Size(min = 3, max = 100, message = "Recipe name must be between 3 and 100 characters.")
    private String recipeName;

    @NotNull(message = "Ingredients list must not be null.")
    @Size(min = 1, message = "At least one ingredient is required.")
    private List<String> recipeIngredients;

    @NotNull(message = "Recipe steps must not be null.")
    @Column(name = "recipe_steps", nullable = false, length = 1000) // Updated length
    @Size(min = 10, max = 1000, message = "Recipe steps must be between 10 and 500 characters.")
    private String recipeSteps;

    private String recipeImageUrl;

    @NotNull(message = "Category ID must not be null.")
    private Long categoryId;

}

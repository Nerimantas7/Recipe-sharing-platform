package lt.receptai.rsp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeCategoryDto {

    private Long id;

    @NotBlank(message = "Category name cannot be empty")
    @Size(max = 100, message = "Category name must not exceed 100 characters")
    private String recipeCategory;

    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String categoryDescription;

}

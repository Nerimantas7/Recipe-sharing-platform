package lt.receptai.rsp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeCategoryDto {

    private Long id;
    private String recipeCategory;
    private String categoryDescription;

}

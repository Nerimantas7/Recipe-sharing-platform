package lt.receptai.rsp.service;

import lt.receptai.rsp.dto.RecipeDto;

import java.util.List;

public interface RecipeService {

    RecipeDto addRecipe(RecipeDto recipeDto);

    RecipeDto getRecipeById(Long recipeId);

    List<RecipeDto> getAllRecipes();

    RecipeDto updateRecipe(RecipeDto recipeDto, Long recipeId);

    void deleteRecipe(Long recipeId);
}

package lt.receptai.rsp.service.impl;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeDto;
import lt.receptai.rsp.entity.Recipe;
import lt.receptai.rsp.repository.RecipeRepository;
import lt.receptai.rsp.service.RecipeService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private RecipeRepository recipeRepository;

    private ModelMapper modelMapper;

    @Override
    public RecipeDto addRecipe(RecipeDto recipeDto) {

        //convert RecipeDto into Recipe Jpa entity
        Recipe recipe =modelMapper.map(recipeDto, Recipe.class);

        //Recipe Jpa entity
        Recipe savedRecipe = recipeRepository.save(recipe);

        //Convert saved Recipe Jpa entity object into RecipeDto entity

        RecipeDto savedRecipeDto = modelMapper.map(savedRecipe, RecipeDto.class);

        return savedRecipeDto;
    }

    @Override
    public RecipeDto getRecipeById(Long recipeId) {

        Recipe recipe = recipeRepository.findById(recipeId).get();
        return modelMapper.map(recipe, RecipeDto.class);
    }

    @Override
    public List<RecipeDto> getAllRecipes() {
        return List.of();
    }

    @Override
    public RecipeDto updateRecipe(Long recipeId, RecipeDto updatedRecipe) {
        return null;
    }

    @Override
    public void deleteRecipe(Long recipeId) {

    }
}

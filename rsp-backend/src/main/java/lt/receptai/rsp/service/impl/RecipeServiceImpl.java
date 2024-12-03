package lt.receptai.rsp.service.impl;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeDto;
import lt.receptai.rsp.entity.Recipe;
import lt.receptai.rsp.exception.ResourceNotFoundException;
import lt.receptai.rsp.repository.RecipeRepository;
import lt.receptai.rsp.service.RecipeService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

        Recipe recipe = recipeRepository.findById(recipeId).
                orElseThrow(()-> new ResourceNotFoundException("Recipe not found with given id: " + recipeId));
        return modelMapper.map(recipe, RecipeDto.class);
    }

    @Override
    public List<RecipeDto> getAllRecipes() {

        List <Recipe> recipes = recipeRepository.findAll();

        return recipes.stream().map((recipe)->modelMapper.map(recipe, RecipeDto.class))
        .collect(Collectors.toList());
    }

    @Override
    public RecipeDto updateRecipe(RecipeDto recipeDto, Long recipeId) {

        Recipe recipe = recipeRepository.findById(recipeId).
                orElseThrow(()-> new ResourceNotFoundException("Recipe not found with given id: " + recipeId));
        recipe.setRecipeName(recipeDto.getRecipeName());
        recipe.setRecipeIngredients(recipeDto.getRecipeIngredients());
        recipe.setRecipeSteps(recipeDto.getRecipeSteps());
        recipe.setRecipeImage(recipeDto.getRecipeImage());

        Recipe updatedRecipe = recipeRepository.save(recipe);
        return modelMapper.map(updatedRecipe, RecipeDto.class);
    }

    @Override
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(()-> new ResourceNotFoundException("Recipe not found with given id: " + recipeId));
        recipeRepository.deleteById(recipeId);
    }
}

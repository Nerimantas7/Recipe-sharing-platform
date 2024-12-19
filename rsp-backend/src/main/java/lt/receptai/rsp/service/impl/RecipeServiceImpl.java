package lt.receptai.rsp.service.impl;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeDto;
import lt.receptai.rsp.entity.Recipe;
import lt.receptai.rsp.entity.RecipeCategory;
import lt.receptai.rsp.exception.ResourceNotFoundException;
import lt.receptai.rsp.repository.RecipeCategoryRepository;
import lt.receptai.rsp.repository.RecipeRepository;
import lt.receptai.rsp.service.RecipeService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private RecipeRepository recipeRepository;

    private RecipeCategoryRepository recipeCategoryRepository;

    private ModelMapper modelMapper;

    @Override
    public RecipeDto addRecipe(RecipeDto recipeDto) {

        if (recipeDto.getRecipeIngredients() == null || recipeDto.getRecipeIngredients().isEmpty()) {
            throw new IllegalArgumentException("Recipe ingredients must not be empty.");
        }

        //convert RecipeDto into Recipe Jpa entity
        Recipe recipe =modelMapper.map(recipeDto, Recipe.class);

        RecipeCategory category = recipeCategoryRepository.findById(recipeDto.getCategoryId())
                .orElseThrow(()-> new ResourceNotFoundException("Category is not exist with given id: " + recipeDto.getCategoryId()));
        recipe.setRecipeCategory(category);

        //Recipe Jpa entity
        Recipe savedRecipe = recipeRepository.save(recipe);

        //Convert saved Recipe Jpa entity object into RecipeDto entity

        return modelMapper.map(savedRecipe, RecipeDto.class);
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
    public RecipeDto updateRecipe(RecipeDto updatedRecipe, Long recipeId) {

        Recipe recipe = recipeRepository.findById(recipeId).
                orElseThrow(()-> new ResourceNotFoundException("Recipe not found with given id: " + recipeId));

        recipe.setRecipeName(updatedRecipe.getRecipeName());
        recipe.setRecipeIngredients(updatedRecipe.getRecipeIngredients());
        recipe.setRecipeSteps(updatedRecipe.getRecipeSteps());
        recipe.setRecipeImageUrl(updatedRecipe.getRecipeImageUrl());

        RecipeCategory category = recipeCategoryRepository.findById(updatedRecipe.getCategoryId())
                .orElseThrow(()-> new ResourceNotFoundException("Category is not exist with given id: " + updatedRecipe.getCategoryId()));
        recipe.setRecipeCategory(category);

        Recipe updatedRecipeObj = recipeRepository.save(recipe);
        return modelMapper.map(updatedRecipeObj, RecipeDto.class);
    }

    @Override
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(()-> new ResourceNotFoundException("Recipe not found with given id: " + recipeId));
        recipeRepository.deleteById(recipeId);
    }

    private void validateRecipeDto(RecipeDto recipeDto) {
        if (recipeDto.getRecipeName() == null || recipeDto.getRecipeName().isEmpty()) {
            throw new IllegalArgumentException("Recipe name must not be empty.");
        }
        if (recipeDto.getRecipeIngredients() == null || recipeDto.getRecipeIngredients().isEmpty()) {
            throw new IllegalArgumentException("Recipe ingredients must not be empty.");
        }
        if (recipeDto.getRecipeSteps() == null || recipeDto.getRecipeSteps().isEmpty()) {
            throw new IllegalArgumentException("Recipe steps must not be empty.");
        }
    }
}

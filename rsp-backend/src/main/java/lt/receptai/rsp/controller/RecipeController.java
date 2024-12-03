package lt.receptai.rsp.controller;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeDto;
import lt.receptai.rsp.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/recipes")
@AllArgsConstructor
public class RecipeController {

    private RecipeService recipeService;

    //Build Add Recipe REST API

    @PostMapping
    public ResponseEntity<RecipeDto> addRecipe(@RequestBody RecipeDto recipeDto){

        RecipeDto savedRecipe = recipeService.addRecipe(recipeDto);
        return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
    }

    //Build Get Recipe REST API

    @GetMapping("{id}")
    public ResponseEntity<RecipeDto> getRecipe(@PathVariable("id") Long recipeId){
        RecipeDto recipeDto = recipeService.getRecipeById(recipeId);
        return new ResponseEntity<>(recipeDto, HttpStatus.OK);
    }

    // Build Get All Recipes REST API
    @GetMapping
    public ResponseEntity<List<RecipeDto>> getAllRecipes(){

        List<RecipeDto> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    // Build Update Recipe REST API
    @PutMapping("{id}")
    public ResponseEntity<RecipeDto> updateRecipe(@RequestBody RecipeDto recipeDto, @PathVariable("id") Long recipeId){
        RecipeDto updatedRecipe = recipeService.updateRecipe(recipeDto, recipeId);
        return ResponseEntity.ok(updatedRecipe);
    }

    //Build Delete Recipe REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable("id") Long recipeId){
        recipeService.deleteRecipe(recipeId);
        return ResponseEntity.ok("Recipe deleted successfully!");
    }
}

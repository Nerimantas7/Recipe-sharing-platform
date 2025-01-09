package lt.receptai.rsp.controller;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeDto;
import lt.receptai.rsp.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/recipes")
@AllArgsConstructor
public class RecipeController {

    private RecipeService recipeService;

    //Build Add Recipe REST API

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<RecipeDto> addRecipe(@Valid @RequestBody RecipeDto recipeDto){
        RecipeDto savedRecipe = recipeService.addRecipe(recipeDto);
        System.out.println("Recipe added successfully: " + savedRecipe.getRecipeName());
        return new ResponseEntity<>(savedRecipe, HttpStatus.CREATED);
    }

    //Build Get Recipe REST API
    @PreAuthorize("hasAnyRole('ADMIN','USER','QUEST')") //?
    @GetMapping("{id}")
    public ResponseEntity<RecipeDto> getRecipeById(@PathVariable("id") Long recipeId){
        RecipeDto recipeDto = recipeService.getRecipeById(recipeId);
        return new ResponseEntity<>(recipeDto, HttpStatus.OK);
    }

    // Build Get All Recipes REST API with Pagination
    @PreAuthorize("hasAnyRole('ADMIN','USER','QUEST')") //?
    @GetMapping
    public ResponseEntity<List<RecipeDto>> getAllRecipes(@RequestParam(defaultValue = "0") int page,
                                                         @RequestParam(defaultValue = "10") int size){

        List<RecipeDto> recipes = recipeService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }

    // Build Update Recipe REST API
    @PreAuthorize("hasRole('USER')")
    @PutMapping("{id}")
    public ResponseEntity<RecipeDto> updateRecipe(@Valid @RequestBody RecipeDto recipeDto, @PathVariable("id") Long recipeId){
        RecipeDto updatedRecipe = recipeService.updateRecipe(recipeDto, recipeId);
        System.out.println("Recipe updated successfully: " + updatedRecipe.getRecipeName());
        return ResponseEntity.ok(updatedRecipe);
    }

    //Build Delete Recipe REST API
    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable("id") Long recipeId){
        recipeService.deleteRecipe(recipeId);
        return ResponseEntity.ok("Recipe deleted successfully!");
    }

    //Optional:
    // Upload Recipe Image
//    @PostMapping(value = "/upload/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<String> uploadImage(
//            @PathVariable("id") Long recipeId,
//            @RequestParam("file") MultipartFile file) {
//        try {
//            recipeService.uploadRecipeImage(recipeId, file);
//            return ResponseEntity.ok("Image uploaded successfully!");
//        } catch (IOException ex) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
//        }
//    }
}

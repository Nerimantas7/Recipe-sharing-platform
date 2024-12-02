package lt.receptai.rsp.controller;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeDto;
import lt.receptai.rsp.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

}

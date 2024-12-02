package lt.receptai.rsp.controller;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeCategoryDto;
import lt.receptai.rsp.dto.RecipeDto;
import lt.receptai.rsp.service.RecipeCategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/categories")
@AllArgsConstructor
public class RecipeCategoryController {

    private RecipeCategoryService recipeCategoryService;

    //Build Add Category REST API

    @PostMapping
    public ResponseEntity<RecipeCategoryDto> addCategory(@RequestBody RecipeCategoryDto recipeCategoryDto){

        RecipeCategoryDto savedCategory = recipeCategoryService.addCategory(recipeCategoryDto);
        return  new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    //Build Get Category REST API

    @GetMapping("{id}")
    public ResponseEntity<RecipeCategoryDto> getCategory(@PathVariable("id") Long categoryId){
        RecipeCategoryDto recipeCategoryDto = recipeCategoryService.getCategoryById(categoryId);
        return new ResponseEntity<>(recipeCategoryDto, HttpStatus.OK);
    }
}

package lt.receptai.rsp.controller;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeCategoryDto;
import lt.receptai.rsp.dto.RecipeDto;
import lt.receptai.rsp.service.RecipeCategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/categories")
@AllArgsConstructor
public class RecipeCategoryController {

    private RecipeCategoryService recipeCategoryService;

    //Build Add Category REST API

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<RecipeCategoryDto> addCategory(@Valid @RequestBody RecipeCategoryDto recipeCategoryDto){

        RecipeCategoryDto savedCategory = recipeCategoryService.addCategory(recipeCategoryDto);
        System.out.println("Category added successfully: " + savedCategory.getRecipeCategory());
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    //Build Get Category REST API
    @GetMapping("{id}")
    public ResponseEntity<RecipeCategoryDto> getCategoryById(@PathVariable("id") Long categoryId){
        RecipeCategoryDto recipeCategoryDto = recipeCategoryService.getCategoryById(categoryId);
        return new ResponseEntity<>(recipeCategoryDto, HttpStatus.OK);
    }

    // Build Get All Recipes Categories REST API
    @GetMapping
    public ResponseEntity<List<RecipeCategoryDto>> getAllCategories(){

        List<RecipeCategoryDto> categories = recipeCategoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    //Build Update Recipe Category REST API
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("{id}")
    public ResponseEntity<RecipeCategoryDto> updateCategory(@RequestBody RecipeCategoryDto categoryDto, @PathVariable("id") Long categoryId){
        RecipeCategoryDto updatedCategory = recipeCategoryService.updateCategory(categoryDto, categoryId);
        System.out.println("Category updated successfully: " + updatedCategory.getRecipeCategory());
        return  ResponseEntity.ok(updatedCategory);
    }

    //Build Delete Recipe Category REST API
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable("id") Long categoryId){
        recipeCategoryService.deleteCategory(categoryId);
        return ResponseEntity.ok("Category deleted successfully!");
    }
}

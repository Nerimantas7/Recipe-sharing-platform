package lt.receptai.rsp.service;

import lt.receptai.rsp.dto.RecipeCategoryDto;
import lt.receptai.rsp.dto.RecipeDto;

import java.util.List;

public interface RecipeCategoryService {

    RecipeCategoryDto addCategory(RecipeCategoryDto recipeCategoryDto);

    RecipeCategoryDto getCategoryById(Long categoryId);

    List<RecipeCategoryDto> getAllCategories();

    RecipeCategoryDto updateCategory(RecipeCategoryDto categoryDto, Long categoryId);

    void deleteCategory(Long categoryId);
}

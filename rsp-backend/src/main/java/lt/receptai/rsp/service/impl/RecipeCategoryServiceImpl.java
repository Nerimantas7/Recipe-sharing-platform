package lt.receptai.rsp.service.impl;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeCategoryDto;
import lt.receptai.rsp.entity.RecipeCategory;
import lt.receptai.rsp.exception.ResourceNotFoundException;
import lt.receptai.rsp.repository.RecipeCategoryRepository;
import lt.receptai.rsp.service.RecipeCategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecipeCategoryServiceImpl implements RecipeCategoryService {

    private RecipeCategoryRepository recipeCategoryRepository;

    private ModelMapper modelMapper;

    @Override
    public RecipeCategoryDto addCategory(RecipeCategoryDto recipeCategoryDto) {

        //convert Recipe Category Dto into Recipe Category Jpa entity
        RecipeCategory recipeCategory = modelMapper.map(recipeCategoryDto, RecipeCategory.class);

        //Recipe Category Jpa entity
        RecipeCategory savedCategory = recipeCategoryRepository.save(recipeCategory);

        //Convert saved Recipe Category Jpa entity object into RecipeCategoryDto entity
        RecipeCategoryDto savedCategoryDto = modelMapper.map(savedCategory, RecipeCategoryDto.class);

        return savedCategoryDto;
    }

    @Override
    public RecipeCategoryDto getCategoryById(Long categoryId) {

        RecipeCategory category = recipeCategoryRepository.findById(categoryId).
                orElseThrow(()-> new ResourceNotFoundException("Category not found with id: "+ categoryId));
        return modelMapper.map(category, RecipeCategoryDto.class);
    }

    @Override
    public List<RecipeCategoryDto> getAllCategories() {

        List<RecipeCategory> categories = recipeCategoryRepository.findAll();
        return categories.stream().map((category)->modelMapper.map(category, RecipeCategoryDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public RecipeCategoryDto updateCategory(RecipeCategoryDto categoryDto, Long categoryId) {

        RecipeCategory category = recipeCategoryRepository.findById(categoryId).
                orElseThrow(() -> new ResourceNotFoundException("Category not found with given id: " + categoryId));
        category.setBookCategory(categoryDto.getRecipeCategory());
        category.setCategoryDescription(categoryDto.getCategoryDescription());

        RecipeCategory updatedCategory = recipeCategoryRepository.save(category);
        return modelMapper.map(updatedCategory, RecipeCategoryDto.class);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        RecipeCategory category = recipeCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with given id: " + categoryId));
        recipeCategoryRepository.deleteById(categoryId);
    }
}

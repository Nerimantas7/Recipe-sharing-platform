package lt.receptai.rsp.service.impl;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeCategoryDto;
import lt.receptai.rsp.dto.RecipeCommentDto;
import lt.receptai.rsp.entity.Recipe;
import lt.receptai.rsp.entity.RecipeCategory;
import lt.receptai.rsp.entity.RecipeComment;
import lt.receptai.rsp.exception.ResourceNotFoundException;
import lt.receptai.rsp.repository.RecipeCommentRepository;
import lt.receptai.rsp.repository.RecipeRepository;
import lt.receptai.rsp.service.RecipeCommentService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecipeCommentServiceImpl implements RecipeCommentService {

    private RecipeCommentRepository recipeCommentRepository;

    private RecipeRepository recipeRepository;

    private ModelMapper modelMapper;

    @Override
    public RecipeCommentDto addComment(Long recipeId, RecipeCommentDto recipeCommentDto) {

        // Fetch the Recipe entity using the provided recipeId
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with ID: " + recipeId));

        //convert Recipe Comment Dto into Recipe Comment Jpa entity
        RecipeComment recipeComment = modelMapper.map(recipeCommentDto, RecipeComment.class);
        recipeComment.setRecipe(recipe);

        // Save RecipeComment Jpa entity
        RecipeComment savedComment = recipeCommentRepository.save(recipeComment);

        //Convert saved Recipe Comment Jpa entity object into Recipe Comment Dto entity
        return modelMapper.map(savedComment, RecipeCommentDto.class);
    }

    @Override
    public RecipeCommentDto getCommentById(Long commentId) {

        RecipeComment comment = recipeCommentRepository.findById(commentId).
                orElseThrow(()-> new ResourceNotFoundException("Comment not found with id: "+ commentId));
        return modelMapper.map(comment, RecipeCommentDto.class);
    }

    @Override
    public List<RecipeCommentDto> getAllComments() {

        List<RecipeComment> comments = recipeCommentRepository.findAll();
        return comments.stream().map((comment)->modelMapper.map(comment, RecipeCommentDto.class))
                .collect(Collectors.toList());
    }

    public List<RecipeCommentDto> getCommentsByRecipeId(Long recipeId) {
        List<RecipeComment> comments = recipeCommentRepository.findByRecipeId(recipeId);
        return comments.stream().map(comment -> modelMapper.map(comment, RecipeCommentDto.class)).collect(Collectors.toList());
    }

    @Override
    public RecipeCommentDto updateComment(RecipeCommentDto commentDto, Long commentId) {

        RecipeComment comment = recipeCommentRepository.findById(commentId).
                orElseThrow(() -> new ResourceNotFoundException("Comment not found with given id: " + commentId));
        comment.setRecipeComment(commentDto.getRecipeComment());

        RecipeComment updatedComment = recipeCommentRepository.save(comment);
        return modelMapper.map(updatedComment, RecipeCommentDto.class);
    }

    @Override
    public void deleteComment(Long commentId) {
        RecipeComment comment = recipeCommentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with given id: " + commentId));
        recipeCommentRepository.deleteById(commentId);

    }
}

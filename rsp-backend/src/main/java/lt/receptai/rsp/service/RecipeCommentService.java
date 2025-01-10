package lt.receptai.rsp.service;

import lt.receptai.rsp.dto.RecipeCommentDto;

import java.util.List;

public interface RecipeCommentService {

    RecipeCommentDto addComment(RecipeCommentDto recipeCommentDto);

    RecipeCommentDto getCommentById(Long commentId);

    List<RecipeCommentDto> getAllComments();

    List<RecipeCommentDto> getCommentsByRecipeId(Long recipeId);

    RecipeCommentDto updateComment(RecipeCommentDto commentDto, Long commentId);

    void  deleteComment(Long commentId);
}

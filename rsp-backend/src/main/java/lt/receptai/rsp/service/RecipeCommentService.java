package lt.receptai.rsp.service;

import lt.receptai.rsp.dto.RecipeCommentDto;

import java.util.List;

public interface RecipeCommentService {

    RecipeCommentDto addComment(RecipeCommentDto recipeCommentDto);

    RecipeCommentDto getCommentById(Long commentId);

    List<RecipeCommentDto> getAllComments();

    RecipeCommentDto updateComment(Long commentId, RecipeCommentDto updatedComment);

    void  deleteComment(Long commentId);
}

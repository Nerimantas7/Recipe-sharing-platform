package lt.receptai.rsp.controller;


import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeCategoryDto;
import lt.receptai.rsp.dto.RecipeCommentDto;
import lt.receptai.rsp.entity.Recipe;
import lt.receptai.rsp.entity.RecipeComment;
import lt.receptai.rsp.entity.User;
import lt.receptai.rsp.exception.ResourceNotFoundException;
import lt.receptai.rsp.repository.RecipeCommentRepository;
import lt.receptai.rsp.repository.RecipeRepository;
import lt.receptai.rsp.repository.UserRepository;
import lt.receptai.rsp.service.RecipeCommentService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/comments")
@AllArgsConstructor
public class RecipeCommentController {

    private RecipeCommentService recipeCommentService;

    private RecipeRepository recipeRepository;

    private UserRepository userRepository;

    private RecipeCommentRepository recipeCommentRepository;

    private ModelMapper modelMapper;

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/recipe/{recipeId}")
    public ResponseEntity<RecipeCommentDto> addComment(
            @PathVariable Long recipeId,
            @RequestBody @Valid RecipeCommentDto recipeCommentDto) {

        // Validate Recipe existence
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with ID: " + recipeId));

        // Validate User existence
        User user = userRepository.findById(recipeCommentDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + recipeCommentDto.getUserId()));

        // Map RecipeCommentDto to RecipeComment
        RecipeComment comment = modelMapper.map(recipeCommentDto, RecipeComment.class);
        comment.setRecipe(recipe);
        comment.setUser(user);

        // Save comment to the repository
        RecipeComment savedComment = recipeCommentRepository.save(comment);

        // Map saved RecipeComment back to RecipeCommentDto
        RecipeCommentDto responseDto = modelMapper.map(savedComment, RecipeCommentDto.class);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }


    // Get Comment REST API
    @GetMapping("{id}")
    public ResponseEntity<RecipeCommentDto> getCommentById(@PathVariable("id") Long commentId){
        RecipeCommentDto recipeCommentDto = recipeCommentService.getCommentById(commentId);
        return new ResponseEntity<>(recipeCommentDto, HttpStatus.OK);
    }

    // Get All Recipes Comments REST API
    @GetMapping
    public ResponseEntity<List<RecipeCommentDto>> getAllComments(){

        List<RecipeCommentDto> comments = recipeCommentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    // Get All Comments for a Specific Recipe REST API
    @GetMapping("/recipe/{recipeId}")
    public ResponseEntity<List<RecipeCommentDto>> getCommentsByRecipeId(@PathVariable("recipeId") Long recipeId) {
        List<RecipeCommentDto> comments = recipeCommentService.getCommentsByRecipeId(recipeId);
        return ResponseEntity.ok(comments);
    }

    // Update Comment REST API
    @PreAuthorize("hasRole('USER')")
    @PutMapping("{id}")
    public ResponseEntity<RecipeCommentDto> updateComment(@RequestBody RecipeCommentDto commentDto, @PathVariable("id") Long commentId){
        RecipeCommentDto updatedComment = recipeCommentService.updateComment(commentDto, commentId);
        return ResponseEntity.ok(updatedComment);
    }

    // Delete Comment REST API
    @PreAuthorize("hasRole('USER')")
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteComment(@PathVariable("id") Long commentId){
        recipeCommentService.deleteComment(commentId);
        return ResponseEntity.ok("Comment deleted successfully!");
    }

}

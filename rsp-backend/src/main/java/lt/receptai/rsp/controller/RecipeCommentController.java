package lt.receptai.rsp.controller;


import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeCategoryDto;
import lt.receptai.rsp.dto.RecipeCommentDto;
import lt.receptai.rsp.service.RecipeCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/comments")
@AllArgsConstructor
public class RecipeCommentController {

    private RecipeCommentService recipeCommentService;

    @PostMapping
    public ResponseEntity<RecipeCommentDto> addComment(@RequestBody RecipeCommentDto recipeCommentDto){

        RecipeCommentDto savedComment = recipeCommentService.addComment(recipeCommentDto);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    //Build Get Comment REST API

    @GetMapping("{id}")
    public ResponseEntity<RecipeCommentDto> getComment(@PathVariable("id") Long commentId){
        RecipeCommentDto recipeCommentDto = recipeCommentService.getCommentById(commentId);
        return new ResponseEntity<>(recipeCommentDto, HttpStatus.OK);
    }

    // Build Get All Recipes Comments REST API
    @GetMapping
    public ResponseEntity<List<RecipeCommentDto>> getAllComments(){

        List<RecipeCommentDto> comments = recipeCommentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    //Build Update Comment REST API
    @PutMapping("{id}")
    public ResponseEntity<RecipeCommentDto> updateComment(@RequestBody RecipeCommentDto commentDto, @PathVariable("id") Long commentId){
        RecipeCommentDto updatedComment = recipeCommentService.updateComment(commentDto, commentId);
        return ResponseEntity.ok(updatedComment);
    }

    //Build Delete Comment REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteComment(@PathVariable("id") Long commentId){
        recipeCommentService.deleteComment(commentId);
        return ResponseEntity.ok("Comment dleted successfully!");
    }

}

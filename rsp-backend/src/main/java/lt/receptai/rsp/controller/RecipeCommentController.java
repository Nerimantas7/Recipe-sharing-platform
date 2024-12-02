package lt.receptai.rsp.controller;


import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeCategoryDto;
import lt.receptai.rsp.dto.RecipeCommentDto;
import lt.receptai.rsp.service.RecipeCommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    //Build Get Coment REST API

    @GetMapping("{id}")
    public ResponseEntity<RecipeCommentDto> getComment(@PathVariable("id") Long commentId){
        RecipeCommentDto recipeCommentDto = recipeCommentService.getCommentById(commentId);
        return new ResponseEntity<>(recipeCommentDto, HttpStatus.OK);
    }
}

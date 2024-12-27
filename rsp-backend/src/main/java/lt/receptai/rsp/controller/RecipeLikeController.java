package lt.receptai.rsp.controller;

import lt.receptai.rsp.dto.RecipeLikeDto;
import lt.receptai.rsp.service.RecipeLikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class RecipeLikeController {

    private RecipeLikeService recipeLikeService;

    // Build Add Recipe Like REST API
    @PostMapping
    public ResponseEntity<RecipeLikeDto> addLike(@RequestBody RecipeLikeDto likeDto){

        RecipeLikeDto savedLike = recipeLikeService.addLike(likeDto);
        return  new ResponseEntity<>(savedLike, HttpStatus.CREATED);
    }

    //Build Get Recipe Like REST API
    @GetMapping("{id}")
    public ResponseEntity<RecipeLikeDto> getLikeById(@PathVariable("id") Long likeId){
        RecipeLikeDto likeDto = recipeLikeService.getLikeById(likeId);
        return new ResponseEntity<>(likeDto, HttpStatus.OK);
    }

    //Build Get All Recipe Likes REST API
    @GetMapping
    public ResponseEntity<List<RecipeLikeDto>> getAllLikes(){

        List<RecipeLikeDto> recipeLikes = recipeLikeService.getAllLikes();
        return ResponseEntity.ok(recipeLikes);
    }

    //Build Update Recipe Like REST API
    @PutMapping("{id}")
    public ResponseEntity<RecipeLikeDto> updateLike(@RequestBody RecipeLikeDto likeDto, @PathVariable("id") Long likeId){
        RecipeLikeDto updatedLike = recipeLikeService.updateLike(likeDto, likeId);
        return ResponseEntity.ok(updatedLike);
    }

    //Build Delete Recipe Like REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteLike(@PathVariable("id") Long likeId){
        recipeLikeService.deleteLike(likeId);
        return ResponseEntity.ok("Like deleted successfully!");
    }
}

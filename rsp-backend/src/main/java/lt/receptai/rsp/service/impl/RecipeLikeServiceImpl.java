package lt.receptai.rsp.service.impl;

import lombok.AllArgsConstructor;
import lt.receptai.rsp.dto.RecipeCategoryDto;
import lt.receptai.rsp.dto.RecipeLikeDto;
import lt.receptai.rsp.entity.Recipe;
import lt.receptai.rsp.entity.RecipeLike;
import lt.receptai.rsp.entity.User;
import lt.receptai.rsp.exception.ResourceNotFoundException;
import lt.receptai.rsp.repository.RecipeLikesRepository;
import lt.receptai.rsp.repository.RecipeRepository;
import lt.receptai.rsp.repository.UserRepository;
import lt.receptai.rsp.service.RecipeLikeService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecipeLikeServiceImpl implements RecipeLikeService {

    private RecipeLikesRepository recipeLikesRepository;

    private ModelMapper modelMapper;

    private RecipeRepository recipeRepository;

    private final UserRepository userRepository;

    @Override
    public RecipeLikeDto addLike(RecipeLikeDto recipeLikeDto) {

        RecipeLike recipeLike = modelMapper.map(recipeLikeDto, RecipeLike.class);
        RecipeLike savedLike = recipeLikesRepository.save(recipeLike);
        return modelMapper.map(savedLike, RecipeLikeDto.class);
    }

    @Override
    public RecipeLikeDto getLikeById(Long likeId) {

        RecipeLike recipeLike = recipeLikesRepository.findById(likeId).
                orElseThrow(() -> new ResourceNotFoundException("Recipe like not found with given id: " + likeId));
        return modelMapper.map(recipeLike, RecipeLikeDto.class);
    }

    @Override
    public List<RecipeLikeDto> getAllLikes() {

        List<RecipeLike> recipeLikes = recipeLikesRepository.findAll();
        return recipeLikes.stream().map((like) -> modelMapper.map(like, RecipeLikeDto.class)).collect(Collectors.toList());
    }

    @Override
    public RecipeLikeDto updateLike(RecipeLikeDto updatedLike, Long likeId) {

        RecipeLike recipeLike = recipeLikesRepository.findById(likeId).
                orElseThrow(() -> new ResourceNotFoundException("Recipe like not found with given id: " + likeId));
        if (updatedLike.getRecipeId() != null) {
            // Fetch the Recipe entity using the ID
            Recipe recipe = recipeRepository.findById(updatedLike.getRecipeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Recipe not found with given id: " + updatedLike.getRecipeId()));
            recipeLike.setRecipe(recipe);
        }

        if (updatedLike.getUserId() != null) {
            // Fetch the User entity using the ID
            User user = userRepository.findById(updatedLike.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with given id: " + updatedLike.getUserId()));
            recipeLike.setUser(user);
        }

        if (updatedLike.getLiked() != null) recipeLike.setLiked(updatedLike.getLiked());

        RecipeLike updatedLikeObj = recipeLikesRepository.save(recipeLike);
        return modelMapper.map(updatedLikeObj, RecipeLikeDto.class);
    }

    @Override
    public void deleteLike(Long likeId) {
        if (!recipeLikesRepository.existsById(likeId)) {
            throw new ResourceNotFoundException("Recipe like not found with given id: " + likeId);
        }
        recipeLikesRepository.deleteById(likeId);
    }
}

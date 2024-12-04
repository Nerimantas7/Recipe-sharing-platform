package lt.receptai.rsp.repository;

import lt.receptai.rsp.entity.RecipeLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RecipeLikesRepository extends JpaRepository<RecipeLike, Long> {

    @Query("SELECT COUNT(r) FROM RecipeLike r WHERE r.recipe.id = :recipeId AND r.liked = true")
    long countLikesByRecipeId(Long recipeId);

    @Query("SELECT COUNT(r) FROM RecipeLike r WHERE r.recipe.id = :recipeId AND r.liked = false")
    long countDislikesByRecipeId(Long recipeId);
}

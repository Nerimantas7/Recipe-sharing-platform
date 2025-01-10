package lt.receptai.rsp.repository;

import lt.receptai.rsp.entity.RecipeComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeCommentRepository extends JpaRepository<RecipeComment, Long> {

    // Custom query to find comments by recipe ID
    List<RecipeComment> findByRecipeId(Long recipeId);
}

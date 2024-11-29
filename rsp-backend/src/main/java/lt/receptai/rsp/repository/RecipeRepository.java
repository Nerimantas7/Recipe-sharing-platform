package lt.receptai.rsp.repository;

import lt.receptai.rsp.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository <Recipe, Long> {
}

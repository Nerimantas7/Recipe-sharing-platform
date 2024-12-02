package lt.receptai.rsp.repository;

import lt.receptai.rsp.entity.RecipeComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeCommentRepository extends JpaRepository<RecipeComment, Long> {
}

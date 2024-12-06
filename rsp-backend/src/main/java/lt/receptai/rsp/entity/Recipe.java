package lt.receptai.rsp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "recipe_name", nullable = false)
    @Size(min = 3, max = 100, message = "Recipe name must be between 3 and 100 characters.")
    private String recipeName;

    @Column(name = "recipe_ingredients", nullable = false)
    @NotEmpty(message = "Recipe ingredients must not be empty.")
    private String recipeIngredients;

    @Column(name = "recipe_steps", nullable = false)
    private String recipeSteps;

    @Column(name="recipe_image")
    private String recipeImageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private RecipeCategory recipeCategory;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<RecipeComment> recipeComments; // Collection of comments

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<RecipeLike> recipeLikes; // Collection of likes/dislikes

    public long getTotalLikes() {
        return recipeLikes.stream().filter(RecipeLike::getLiked).count();
    }

    public long getTotalDislikes() {
        return recipeLikes.stream().filter(like -> !like.getLiked()).count();
    }

    public boolean hasUserLiked(Long userId) {
        return recipeLikes.stream().anyMatch(like -> like.getUser().equals(userId) && like.getLiked());
    }

}

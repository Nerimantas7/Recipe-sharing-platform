package lt.receptai.rsp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
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

//    @Column(name = "recipe_ingredients", nullable = false)
//    @NotEmpty(message = "Recipe ingredients must not be empty.")
//    private String recipeIngredients;

    @NotEmpty(message = "Recipe ingredients must not be empty.")
    @ElementCollection
    @CollectionTable(name = "recipe_ingredients", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "ingredient", nullable = false)
    private List<String> recipeIngredients = new ArrayList<>(); // Store as a list

    @Column(name = "recipe_steps", nullable = false, length = 1000)
    private String recipeSteps;

    @Column(name="recipe_image")
    private String recipeImageUrl;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private RecipeCategory recipeCategory;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<RecipeComment> recipeComments = new ArrayList<>(); // Collection of comments

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<RecipeLike> recipeLikes = new ArrayList<>(); // Collection of likes/dislikes

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

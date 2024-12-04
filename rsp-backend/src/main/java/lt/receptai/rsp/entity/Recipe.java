package lt.receptai.rsp.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String recipeName;

    @Column(name = "recipe_ingredients", nullable = false)
    private String recipeIngredients;

    @Column(name = "recipe_steps", nullable = false)
    private String recipeSteps;

    @Column(name="recipe_image")
    private byte[] recipeImage; // Binary data for the image

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private RecipeCategory recipeCategory;

//    @OneToMany(fetch = FetchType.EAGER)
//    @JoinColumn(name = "comment_id")
//    private RecipeComment recipeComment;


}

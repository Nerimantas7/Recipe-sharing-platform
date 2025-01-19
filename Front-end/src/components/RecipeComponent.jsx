import { useEffect, useState } from "react";
import { createRecipe, getRecipe, updateRecipe } from "../services/RecipeService";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../services/CategoryService";

const RecipeComponent = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [recipeSteps, setRecipeSteps] = useState("");
  const [recipeImageUrl, setRecipeImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  // Initialize state variables to hold validation errors
  const [errors, setErrors] = useState({
    recipeName: "",
    recipeIngredients: "",
    recipeImageUrl: "",
    recipeSteps: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getRecipe(id)
        .then((response) => {
          console.log(response.data);
          const recipe = response.data;
          setRecipeName(recipe.recipeName);
          setRecipeIngredients(recipe.recipeIngredients);
          setRecipeSteps(recipe.recipeSteps);
          setRecipeImageUrl(recipe.recipeImageUrl);
          setCategoryId(recipe.categoryId);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getAllCategories()
      .then((response) => {
        setCategories(response.data);
        console.log("Categories for recipe got");
      })
      .catch((error) => {
        console.error("Category for recipe not got", error);
      });
  }, [id]);

  // Function to save added or updated data from form
  function saveOrUpdateRecipe(e) {
    e.preventDefault();

    if (validateForm()) {
      // Add form validation check
      const recipe = {
        recipeName,
        recipeIngredients,
        recipeSteps,
        recipeImageUrl,
        categoryId,
      };

      if (id) {
        // Add a confirmation dialog
        if (window.confirm("Are you sure to update this recipe?")) {
          console.log(recipe);

          updateRecipe(id, recipe)
            .then((response) => {
              console.log(response.data);
              navigator(`/edit-recipe/${id}`); 
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("Update operation cancelled");
        }
      } else {
        // Add a confirmation dialog
        if (window.confirm("Are you want to save this recipe?")) {
          console.log(recipe);

          createRecipe(recipe)
            .then((response) => {
              console.log(response.data);
              navigator("/add-recipe");
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("Save operation cancelled");
        }
      }
    }
  }

  // Function to check the form data
  function validateForm() {
    const errorsCopy = {};
  
    if (!recipeName.trim()) errorsCopy.recipeName = "Recipe name is required";
    if (!recipeIngredients.trim()) errorsCopy.recipeIngredients = "Ingredients are required";
    if (!recipeSteps.trim()) errorsCopy.recipeSteps = "Steps are required";
    if (!categoryId) errorsCopy.recipeCategory = "Category is required";
    if (!recipeImageUrl.trim() || !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(recipeImageUrl)) {
      errorsCopy.recipeImageUrl = "Valid image URL is required";
    }
  
    setErrors(errorsCopy);
    return Object.keys(errorsCopy).length === 0;
  }
  

  const handleCancel = () => {
    navigator("/recipes");
  };

  function pageTitle() {
    if (id) {
      return <h3 className="text-center">Update Recipe</h3>;
    } else {
      return <h3 className="text-center">Add Recipe</h3>;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3 mt-4">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Recipe name:</label>
                <input
                  type="text"
                  placeholder="Enter recipe name"
                  name="recipeName"
                  value={recipeName}
                  className={`form-control ${errors.recipeName ? "is-invalid" : ""}`}
                  onChange={(e) => setRecipeName(e.target.value)}
                />
                {errors.recipeName && (
                  <div className="invalid-feedback">{errors.recipeName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Ingredients:</label>
                <input
                  type="text"
                  placeholder="Enter ingredients"
                  name="recipeIngredients"
                  value={recipeIngredients}
                  className={`form-control ${errors.recipeIngredients ? "is-invalid" : ""}`}
                  onChange={(e) =>
                    setRecipeIngredients(e.target.value.split(","))
                  }
                />
                {errors.recipeIngredients && (
                  <div className="invalid-feedback">
                    {errors.recipeIngredients}
                  </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Steps:</label>
                <input
                  type="text"
                  placeholder="Enter steps"
                  name="steps"
                  value={recipeSteps}
                  className={`form-control ${errors.recipeSteps ? "is-invalid" : ""}`}
                  onChange={(e) => setRecipeSteps(e.target.value)}
                />
                {errors.recipeSteps && (
                  <div className="invalid-feedback">{errors.recipeSteps}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Image:</label>
                <input
                  type="text"
                  placeholder="Add image"
                  name="recipeImageUrl"
                  value={recipeImageUrl}
                  className={`form-control ${errors.recipeImageUrl ? "is-invalid" : ""}`}
                  onChange={(e) => setRecipeImageUrl(e.target.value)}
                />
                {errors.recipeImageUrl && (
                  <div className="invalid-feedback">
                    {errors.recipeImageUrl}
                  </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Category:</label>
                <select
                  className={`form-control ${errors.recipeCategory ? "is-invalid" : ""}`}
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="Select category">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.recipeCategory}
                    </option>
                  ))}
                </select>
                {errors.recipeCategory && (
                  <div className="invalid-feedback">
                    {errors.recipeCategory}
                  </div>
                )}
              </div>

              <button
                className="btn btn-secondary"
                onClick={saveOrUpdateRecipe}
              >
                Submit
              </button>
              <button className="btn btn-secondary mx-3" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeComponent;
//   return (
//     <>
//       <h3>{recipeName}</h3>
//       <ul>
//         {ingredients.map((recipe) => (
//           <li key={id}>{recipe}</li>
//         ))}
//       </ul>
//       <p>{steps}</p>
//       <img src={image} alt={recipe.name} />
//     </>
//   );
// };

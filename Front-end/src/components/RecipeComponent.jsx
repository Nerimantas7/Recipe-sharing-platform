import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RecipeComponent = () => {
  const { recipeName, setRecipeName } = useState("");
  const { ingredients, setIngredients } = useState("");
  const { steps, setSteps } = useState("");
  const { imageUrl, setImageUrl } = useState("");
  const { recipeIngredients, setRecipeIngredients } = useState("");
  const { recipeSteps, setRecipeSteps } = useState("");
  const { recipeImageUrl, setRecipeImageUrl } = useState("");
  const { categoryId, setCategoryId } = useState("");
  const { categories, setCategories } = useState([]);

  const { id } = useParams();

  // Initialize state variables to hold validation errors
  const [errors, setErrors] = useState({
    recipeName: "",
    recipeIngredients: "",
    recipeImageUrl: "",
    recipeSteps: "",
    recipeIngredients: "",
    recipeSteps: "",
    recipeImageUrl: "",
    recipeCategory: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getRecipe(id)
        .then((response) => {
          console.log(response.data);
          setRecipeName(response.data.recipeName);
          setRecipeIngredients(response.data.recipeIngredients);
          setRecipeSteps(response.data.recipeSteps);
          setRecipeImageUrl(response.data.recipeImageUrl);
          setCategoryId(response.data.categoryId);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    getAllCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // Function to save added or updated data from form
  function saveOrUpdateRecipe(e) {
    e.preventDefault();
    
    if (validateForm()) {
      // Add form validation check
      const recipe = { recipeName, recipeIngredients, recipeSteps, recipeImageUrl, categoryId };

      if (id) {
        // Add a confirmation dialog
        if (window.confirm("Are you sure to update this recipe?")) {
          console.log(recipe);

          updateRecipe(id, recipe)
            .then((response) => {
              console.log(response.data);
              navigator("/recipes"); //not exist yet
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
              navigator("/recipes");
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
    let valid = true;

    // Use spread operator(...) to copy object into another object
    const errorsCopy = { ...errors };

    if (recipeName.trim()) {
      errorsCopy.recipeName = "";
    } else {
      errorsCopy.recipeName = "Recipe name is required";
      valid = false;
    }

    if (recipeIngredients.trim()) {
        errorsCopy.recipeIngredients = '';    
    } else {
        errorsCopy.recipeIngredients = 'Ingredients are required';
        valid = false;
      errorsCopy.ingredients = "Ingredients are required";
      valid = false;
    }

    if (recipeSteps.trim()) {
        errorsCopy.recipeSteps = '';    
    } else {
        errorsCopy.recipeSteps = 'Steps are required';
        valid = false;      
    }

    if (categoryId) {
      errorsCopy.recipeCategory = "";
    } else {
      errorsCopy.recipeCategory = "Select category";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  const handleCancel = () => {
    navigator("/");
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

                        <div className='form-group mb-2'>
                            <label className='form-label'>Ingredients:</label>
                            <input
                                type='text'
                                placeholder='Enter ingredients'
                                name='ingredients'
                                value={recipeIngredients}
                                className={`form-control ${errors.recipeIngredients ? 'is-invalid' : ''}`}
                                onChange={(e) => setRecipeIngredients(e.target.value)}
                            />
                            {errors.recipeIngredients && <div className='invalid-feedback'>{errors.recipeIngredients}</div>}
                        </div>
                       
                        <div className='form-group mb-2'>
                                <label className='form-label'>Steps:</label>
                                <input
                                    type='text'
                                    placeholder='Enter steps'
                                    name='steps'
                                    value={recipeSteps}
                                    className={`form-control ${errors.recipeSteps ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRecipeSteps(e.target.value)}
                                />
                                {errors.recipeSteps && <div className='invalid-feedback'>{errors.recipeSteps}</div>}
                            </div>
              <div className="form-group mb-2">
                <label className="form-label">Ingredients:</label>
                <input
                  type="text"
                  placeholder="Enter ingredients"
                  name="ingredients"
                  value={ingredients}
                  className={`form-control ${errors.ingredients ? "is-invalid" : ""}`}
                  onChange={(e) => setIngredients(e.target.value)}
                />
                {errors.ingredients && (
                  <div className="invalid-feedback">{errors.ingredients}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Steps:</label>
                <input
                  type="text"
                  placeholder="Enter steps"
                  name="steps"
                  value={steps}
                  className={`form-control ${errors.steps ? "is-invalid" : ""}`}
                  onChange={(e) => setSteps(e.target.value)}
                />
                {errors.steps && (
                  <div className="invalid-feedback">{errors.steps}</div>
                )}
              </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Add image:</label>
                            <input
                                type='text'
                                placeholder='Add image'
                                name='recipeImageUrl'
                                value={recipeImageUrl}
                                className={`form-control ${errors.recipeImageUrl ? 'is-invalid' : ''}`}
                                onChange={(e) => setRecipeImageUrl(e.target.value)}
                            />
                            {errors.recipeImageUrl && <div className='invalid-feedback'>{errors.recipeImageUrl}</div>}
                        </div>                        
              <div className="form-group mb-2">
                <label className="form-label">Add image:</label>
                <input
                  type="text"
                  placeholder="Add image"
                  name="imageUrl"
                  value={imageUrl}
                  className={`form-control ${errors.imageUrl ? "is-invalid" : ""}`}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {errors.imageUrl && (
                  <div className="invalid-feedback">{errors.imageUrl}</div>
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

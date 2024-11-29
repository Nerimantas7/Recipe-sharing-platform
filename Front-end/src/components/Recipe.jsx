import { useState } from "react";

const RecipeComponent = (props) => {
  const { recipeName, setRecipeName } = useState("");
  const { ingredients, setIngredients } = useState("");
  const { steps, setSteps } = useState("");
  const { image, setImage } = useState("");
  const { categoryId, setCategoryId } = useState("");
  const { categories, setCategories } = useState([]);

  const { id } = useParams();

  // Initialize state variables to hold validation errors
  const [errors, setErrors] = useState({
    recipeName: "",
    ingredients: "",
    image: "",
    steps: "",
    recipeCategory: "",
  });

// Function to save added or updated data from form
function saveOrUpdateRecipe(e) {
    e.preventDefault();

    if (validateForm()) { // Add form validation check
        const book = { recipeName, ingredients, steps, image, categoryId };

        if (id) {
            // Add a confirmation dialog
            if (window.confirm('Are you sure to update this recipe?')) {
                console.log(recipe);

                updateRecipe(id, recipe).then((response) => {
                    console.log(response.data);
                    navigator('/recipes');      //not exist yet
                }).catch(error => {
                    console.error(error);
                });
            } else {
                console.log('Update operation cancelled');
            }
        } else {
            // Add a confirmation dialog
            if (window.confirm('Are you want to save this recipe?')) {
                console.log(recipe);

                createRecipe(recipe).then((response) => {
                    console.log(response.data);
                    navigator('/recipes');
                }).catch(error => {
                    console.error(error);
                });
            } else {
                console.log('Save operation cancelled');
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
        errorsCopy.recipeName = '';
    } else {
        errorsCopy.recipeName = 'Recipe name is required';
        valid = false;
    }

    if (ingredients.trim()) {
        errorsCopy.ingredients = '';
    } else {
        errorsCopy.ingredients = 'Ingredients are required';
        valid = false;
    }

    if (steps.trim()) {
        errorsCopy.steps = '';
    } else {
        errorsCopy.steps = 'Steps are required';
        valid = false;
    }

    if (categoryId) {
        errorsCopy.recipeCategory = '';
    } else {
        errorsCopy.recipeCategory = 'Select category';
        valid = false;
    }

    setErrors(errorsCopy);

    return valid;
}

const handleCancel = () => {
    navigator('/');
};

function pageTitle() {
    if (id) {
        return <h3 className='text-center'>Update Recipe</h3>;
    } else {
        return <h3 className='text-center'>Add Recipe</h3>;
    }
}

return (
    <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3 mt-4'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Recipe name:</label>
                            <input
                                type='text'
                                placeholder='Enter recipe name'
                                name='recipeName'
                                value={recipeName}
                                className={`form-control ${errors.recipeName ? 'is-invalid' : ''}`}
                                onChange={(e) => setRecipeName(e.target.value)}
                            />
                            {errors.recipeName && <div className='invalid-feedback'>{errors.recipeName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Ingredients:</label>
                            <input
                                type='text'
                                placeholder='Enter ingredients'
                                name='ingredients'
                                value={ingredients}
                                className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                                onChange={(e) => setIngredients(e.target.value)}
                            />
                            {errors.ingredients && <div className='invalid-feedback'>{errors.ingredients}</div>}
                        </div>
                       
                        <div className='form-group mb-2'>
                                <label className='form-label'>Steps:</label>
                                <input
                                    type='text'
                                    placeholder='Enter steps'
                                    name='steps'
                                    value={steps}
                                    className={`form-control ${errors.steps ? 'is-invalid' : ''}`}
                                    onChange={(e) => setSteps(e.target.value)}
                                />
                                {errors.steps && <div className='invalid-feedback'>{errors.steps}</div>}
                            </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Add image:</label>
                            <input
                                type='text'
                                placeholder='Add image'
                                name='imagePath'
                                value={image}
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            {errors.image && <div className='invalid-feedback'>{errors.image}</div>}
                        </div>                        

                        <div className='form-group mb-2'>
                            <label className='form-label'>Category:</label>
                            <select
                                className={`form-control ${errors.recipeCategory ? 'is-invalid' : ''}`}
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="Select category">Select category</option>
                                {
                                    categories.map(category =>
                                        <option key={category.id} value={category.id}>{category.recipeCategory}</option>
                                    )
                                }

                            </select>
                            {errors.recipeCategory && <div className='invalid-feedback'>{errors.recipeCategory}</div>}
                        </div>

                        <button className='btn btn-secondary' onClick={saveOrUpdateRecipe}>Submit</button>
                        <button className='btn btn-secondary mx-3' onClick={handleCancel}>Cancel</button>
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

import React, { useEffect, useState } from "react";
import { listRecipes } from "../services/RecipeService";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ListRecipeComponent = () => {
  const [recipes, setRecipes] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    listRecipes()
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function updateRecipe(id) {
    navigator(`/edit-recipe/${id}`); //must be backtick symbols
  }
  function updateRecipe(id) {
    navigator(`/edit-recipe/${id}`); //must be backtick symbols
  }

  function removeRecipe(id){
    console.log(id);

    if(window.confirm('Are you sure you want to delete this recipe?')){
    deleteRecipe(id).then((response) => {
        getAllRecipes();

    }).catch(error =>{
        console.error(error);
    });
}else{
    console.log('Delete operation cancelled');
}
}

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-1 mx-4 my-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card mb-3 mx-auto"
            style={{ maxWidth: "450px" }}
          >
            {/* <div className="row g-0">
              <div className="col-md-4"> */}
            <img
              src={recipe.recipeImageUrl}
              className="img-fluid rounded-start"
              alt={recipe.recipeName}
            />
            {/* </div> */}
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title">{recipe.recipeName}</h5>
                <p className="card-text">{recipe.recipeIngredients}</p>
                <p className="card-text">{recipe.recipeSteps}</p>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleShowModal(recipe)}
                >
                  Write a comment
                </button>
                <button
                  className="btn btn-outline-secondary mx-3"
                  onClick={() => handleShowModal(recipe)}
                >
                  Read comments
                </button>
              </div>

              {/* {isAdmin && ( */}
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => updateRecipe(recipe.id)}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary mx-3"
                  onClick={() => removeRecipe(recipe.id)}
                >
                  Delete
                </button>
              </div>
              {/* )} */}
            </div>
          </div>
          // </div>
        ))}
      </div>
    </div>
  );
};

export default ListRecipeComponent;

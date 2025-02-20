import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listRecipes, deleteRecipe } from "../services/RecipeService";
import { getLoggedInUser } from "../services/AuthService";
import SidebarLeftComponent from "./SidebarLeftComponent";

const MyRecipesComponent = () => {
  const [recipes, setRecipes] = useState([]);
  const [userId, setUserId] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUserId(loggedInUser.userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchRecipes();
    }
  }, [userId]);

  const fetchRecipes = () => {
    listRecipes()
      .then((response) => {
        const filteredRecipes = response.data.filter(
          (recipe) => recipe.userId === userId
        );
        setRecipes(filteredRecipes);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  };

  const updateRecipe = (id) => {
    navigator(`/edit-recipe/${id}`); //must be backtick symbols
  };

  const removeRecipe = (id) => {
    console.log(id);

    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id)
        .then((response) => {
          console.log(response.data);
          fetchRecipes();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Delete operation cancelled");
    }
  };

  const refreshRecipes = () => {
    fetchRecipes(); // Refresh the recipes list
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar - 3 columns */}
        <div className="col-md-3 col-lg-2 bg-light vh-100">
          <SidebarLeftComponent />
        </div>
        <div className="col-md-9 col-lg-10" style={{ marginTop: "100px" }}>
          <div className="row row-cols-1 row-cols-md-3 g-1 mx-4 my-3">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="card mb-3 mx-auto"
                style={{ width: "20rem" }}
              >
                <img
                  src={recipe.recipeImageUrl}
                  className="card-img-top"
                  alt={recipe.recipeName}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.recipeName}</h5>
                  <p className="card-text">{recipe.recipeSteps}</p>
                  <div className="card-footer d-flex justify-content-between">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipesComponent;

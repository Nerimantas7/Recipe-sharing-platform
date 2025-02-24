import React, { useEffect, useState } from "react";
import { listRecipes, deleteRecipe } from "../services/RecipeService";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../services/AuthService";
import CommentComponent from "../components/CommentComponent";
import AllCommentsComponent from "./AllCommentsComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ListRecipeComponent = () => {
  const [recipes, setRecipes] = useState([]);

  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const [expandedRecipes, setExpandedRecipes] = useState({});

  const [commentId, setCommentId] = useState(null); // For editing comments

  const navigator = useNavigate();
  const isAuth = isUserLoggedIn();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    listRecipes()
      .then((response) => {
        setRecipes(response.data);
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

  const toggleExpand = (id) => {
    setExpandedRecipes((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle specific recipe's expansion state
    }));
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div className="row row-cols-1 row-cols-md-3 g-1 mx-4 my-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card mb-3 mx-auto"
            style={{ width: "25rem" }}
          >
            <img
              src={recipe.recipeImageUrl}
              className="img-fluid rounded-start"
              alt={recipe.recipeName}
            />
            <div className="col-md-12">
              <div className="card-body">
                <p className="card-text">Author: {recipe.userId}</p>
                <h5 className="card-title">{recipe.recipeName}</h5>
                {/* <p className="card-text">{recipe.recipeIngredients}</p> */}

                <p className="card-text">
                  <strong>Ingredients:</strong>
                </p>
                <ul>
                  {Array.isArray(recipe.recipeIngredients)
                    ? recipe.recipeIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))
                    : recipe.recipeIngredients
                        .split(",")
                        .map((ingredient, index) => (
                          <li key={index}>{ingredient.trim()}</li>
                        ))}
                </ul>
                {/* <p className="card-text">
                  <strong>Steps:</strong>
                </p>
                <p className="card-text text-truncate">{recipe.recipeSteps}</p> */}

                <p className="card-text">
                  <strong>Steps:</strong>
                </p>
                <p className="card-text">
                  {expandedRecipes[recipe.id]
                    ? recipe.recipeSteps
                    : recipe.recipeSteps.substring(0, 100) + "... "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(recipe.id);
                    }}
                  >
                    {expandedRecipes[recipe.id] ? "Show less" : "Read more"}
                  </a>
                </p>

                {isAuth && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary mx-3"
                    data-bs-toggle="modal"
                    data-bs-target="#writeComment"
                    onClick={() => setSelectedRecipeId(recipe.id)}
                  >
                    Write a comment
                  </button>
                )}
                <CommentComponent recipeId={selectedRecipeId} />

                <button
                  type="button"
                  className="btn btn-outline-secondary mx-3 position-relative"
                  data-bs-toggle="modal"
                  data-bs-target="#readComments"
                  onClick={() => setSelectedRecipeId(recipe.id)}
                >
                  Read comments{" "}
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                    4
                  </span>
                </button>
                <AllCommentsComponent recipeId={selectedRecipeId} />
              </div>

              {/* {isAuth && (
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
                )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListRecipeComponent;

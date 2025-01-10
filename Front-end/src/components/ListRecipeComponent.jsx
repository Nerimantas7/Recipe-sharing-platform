import React, { useEffect, useState } from "react";
import { listRecipes } from "../services/RecipeService";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../services/AuthService";
import CommentComponent from "../components/CommentComponent";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const ListRecipeComponent = () => {

  const [recipes, setRecipes] = useState([]);

  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const [showCommentModal, setShowCommentModal] = useState(false);

  const [showCommentsModal, setShowCommentsModal] = useState(false);

  const navigator = useNavigate();
  const isAuth = isUserLoggedIn();

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

  function removeRecipe(id) {
    console.log(id);

    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id)
        .then(() => {
          getAllRecipes();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("Delete operation cancelled");
    }
  }

  const handleAddComment = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowCommentModal(true);
  };

  const handleShowComments = (recipeId) => {
    setSelectedRecipeId(recipeId);
    setShowCommentsModal(true);
  };

  const handleCloseModal = () => {
    setShowCommentModal(false);
    setShowCommentsModal(false);
    setSelectedRecipeId(null);
  };

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

                {isAuth && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleAddComment(recipe.id)}
                  >
                    Write a comment
                  </button>
                )}
                <button
                  className="btn btn-outline-secondary mx-3"
                  onClick={() => handleShowComments(recipe.id)}
                >
                  Read comments
                </button>
              </div>

              {isAuth && (
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
              )}
            </div>
          </div>
          // </div>
        ))}
      </div>

      {/* Modal for Adding Comments */}
      {showCommentModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <CommentComponent recipeId={selectedRecipeId} />
              <button
                className="btn btn-secondary mt-3"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Reading Comments */}
      {/* {showCommentsModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <h5 className="modal-title">Comments</h5>
              <div className="modal-body"> */}
                {/* Add logic to fetch and display comments for selectedRecipeId */}
                {/* <p>Display comments for Recipe ID: {selectedRecipeId}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      
    </div>
  );
};

export default ListRecipeComponent;

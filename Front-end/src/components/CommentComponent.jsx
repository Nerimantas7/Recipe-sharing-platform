import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CommentComponent = () => {
  const [recipeComment, setRecipeComment] = useState("");

  const [errors, setErrors] = useState({
    recipeComment: "",
  });

  const { id } = useParams();

  const navigator = useNavigate();

  // Function to save added or updated data from form
  function saveOrUpdateComment(e) {
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
    const errorsCopy = {};

    if (!recipeComment.trim()) {
      errorsCopy.recipeComments = "Comment is required";
    }
    setErrors(errorsCopy);
    return Object.keys(errorsCopy).length === 0;
  }

  const handleCancel = () => {
    navigator("/recipes");
  };

  return (
    <div class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Recipe comment</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <label className="form-label">Comment:</label>
            <input
              type="text"
              placeholder="Enter comment"
              name="comment"
              value={recipeComment}
              className={`form-control ${errors.recipeComment ? "is-invalid" : ""}`}
              onChange={(e) => setRecipeComment(e.target.value)}
            />
            {errors.recipeComment && (
              <div className="invalid-feedback">{errors.recipeComment}</div>
            )}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              onClick={saveOrUpdateComment}
            >
              Submit
            </button>
            <button className="btn btn-secondary mx-3" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;

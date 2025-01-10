import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment, updateComment } from "../services/CommentService";

const CommentComponent = () => {
  const [recipeComment, setRecipeComment] = useState("");

  const [errors, setErrors] = useState({ recipeComment: "" });

  const { id } = useParams();

  const navigator = useNavigate();

  // Function to save added or updated data from form
  function saveOrUpdateComment(e) {
    e.preventDefault();

    if (validateForm()) {
      // Add form validation check
      const comment = { recipeComment };

      if (id) {
        // Add a confirmation dialog
        if (window.confirm("Are you sure to update this comment?")) {
          console.log(comment);

          updateComment(id, comment)
            .then((response) => {
              console.log("Comment updated:", response.data);
              navigator("/recipes");
            })
            .catch((error) => {
              console.error("Error updating comment:", error);
              alert("Failed to update the comment.");
            });
        } else {
          console.log("Update operation cancelled");
        }
      } else {
        // Add a confirmation dialog
        if (window.confirm("Are you want to save this comment?")) {
          console.log(comment);

          createComment(comment)
            .then((response) => {
              console.log("Comment created:", response.data);
              navigator("/recipes");
            })
            .catch((error) => {
              console.error("Error creating comment:", error);
              alert("Failed to create the comment.");
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
      errorsCopy.recipeComment = "Comment is required";
    }
    setErrors(errorsCopy);
    return Object.keys(errorsCopy).length === 0;
  }

  const handleCancel = () => {
    navigator("/recipes");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h5 className="modal-title">Recipe Comment</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleCancel}
          ></button>
        </div>
        <div className="modal-body">
          <label className="form-label">Comment:</label>
          <input
            type="text"
            placeholder="Enter comment"
            name="recipeComment"
            value={recipeComment}
            className={`form-control ${errors.recipeComment ? "is-invalid" : ""}`}
            onChange={(e) => setRecipeComment(e.target.value)}
          />
          {errors.recipeComment && (
            <div className="invalid-feedback">{errors.recipeComment}</div>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={saveOrUpdateComment}>
            Submit
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;

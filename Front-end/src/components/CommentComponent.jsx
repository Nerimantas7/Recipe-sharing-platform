import React from "react";
import { useState } from "react";
import { createComment, updateComment } from "../services/CommentService";

import PropTypes from "prop-types";

const CommentComponent = ({ id, onClose, onSuccess }) => {
  const [recipeComment, setRecipeComment] = useState("");

  const [errors, setErrors] = useState({ recipeComment: "" });  

  // Function to save added or updated data from form
  const saveOrUpdateComment = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Add form validation check
      const comment = { recipeComment };

      if (id) {
        // Add a confirmation dialog
        if (window.confirm("Are you sure you want to update this comment?")) {
          console.log(comment);

          updateComment(id, comment)
            .then((response) => {
              console.log("Comment updated:", response.data);
              onSuccess();
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
        if (window.confirm("Do you want to save this comment?")) {
          console.log(comment);

          createComment(comment)
            .then((response) => {
              console.log("Comment created:", response.data);
              onSuccess();
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
  };

  // Function to check the form data
  function validateForm() {
    const errorsCopy = {};

    if (!recipeComment.trim()) {
      errorsCopy.recipeComment = "Comment is required";
    }
    setErrors(errorsCopy);
    return Object.keys(errorsCopy).length === 0;
  }

  return (
    <div className="modal-backdrop" aria-hidden="true">
      <div className="modal" role="dialog" aria-labelledby="commentModalTitle">
        <div className="modal-header">
          <h5 id="commentModalTitle" className="modal-title">
            {id ? "Update Comment" : "Add Comment"}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          <label htmlFor="commentInput" className="form-label">
            Comment:
          </label>
          <input
            id="commentInput"
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
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

CommentComponent.propTypes = {
  id: PropTypes.string, // For update use case
  onClose: PropTypes.func.isRequired, // Function to close the modal
  onSuccess: PropTypes.func.isRequired, // Function to refresh parent state on success
};

export default CommentComponent;

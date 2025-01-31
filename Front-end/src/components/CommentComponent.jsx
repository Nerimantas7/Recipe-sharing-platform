import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  getCommentById,
  updateComment,
} from "../services/CommentService";
import { getLoggedInUser } from "../services/AuthService";
import { getRecipeId } from "../services/RecipeService";

const CommentComponent = ({ recipeId }) => {
  const [recipeComment, setRecipeComment] = useState("");
  // const [recipeId, setRecipeId] = useState("recipeId");
  const [userId, setUserId] = useState("");
  // const [userName, setUsername] = useState("");
  // const [createdAt, setCreatedAt] = useState("");
  // const [updatedAt, setUpdatedAt] = useState("");

  const { id: paramRecipeId } = useParams();

  const [errors, setErrors] = useState({
    recipeComment: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUserId(loggedInUser.userId);
    }
  }, []);

  const finalRecipeId = recipeId || paramRecipeId;

  // Function to save added or updated data from form
  function saveOrUpdateComment(e) {
    e.preventDefault();

    if (!recipeComment.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    if (!userId || !finalRecipeId) {
      alert("Error: Missing user or recipe information.");
      return;
    }

    const comment = {
      recipeComment,
      recipeId: finalRecipeId, // Directly use the passed prop
      userId,
    };

    console.log("Comment data:", comment);

    if (window.confirm("Are you sure you want to save this comment?")) {
      createComment(comment)
        .then((response) => {
          console.log("Comment created:", response.data);
          navigator(`/recipes/${finalRecipeId}`);
        })
        .catch((error) => {
          console.error("Error creating comment:", error);
          alert("Failed to create the comment.");
        });
    }   
  }

  // Function to check the form data
  // function validateForm() {
  //   const errorsCopy = {};

  //   if (!recipeComment.trim()) {
  //     errorsCopy.recipeComment = "Comment is required";
  //   }
  //   setErrors(errorsCopy);
  //   return Object.keys(errorsCopy).length === 0;
  // }

  const handleCancel = () => {
    setRecipeComment("");
    setErrors({});
    navigator("/recipes");
  };

  function pageTitle() {
    if (recipeId) {
      return (
        <h5 className="modal-title" id="staticBackdropLabel">
          Update Comment
        </h5>
      );
    } else {
      return (
        <h5 className="modal-title" id="staticBackdropLabel">
          Add Comment
        </h5>
      );
    }
  }

  return (
    <div
      className="modal fade"
      id="writeComment"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {/* <h5 className="modal-title" id="staticBackdropLabel">
              Write a comment
            </h5> */}
            {pageTitle()}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              {/* <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div> */}
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Comment:
                </label>
                {/* <textarea className="form-control" id="message-text"></textarea> */}
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
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => saveOrUpdateComment(e)}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createComment,
  getCommentById,
  updateComment,
} from "../services/CommentService";
import { getLoggedInUser } from "../services/AuthService";

const CommentComponent = () => {
  const [recipeComment, setRecipeComment] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  const { id } = useParams();

  const [errors, setErrors] = useState({
    recipeComment: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getCommentById(id)
        .then((response) => {
          const { recipeComment, recipeId, userId, createdAt, updatedAt } = response.data;
          setRecipeComment(recipeComment);
          setRecipeId(recipeId);
          setUserId(userId);
          setCreatedAt(createdAt);
          setUpdatedAt(updatedAt);
        })
        .catch((error) => {
          console.error("Error fetching comment: ", error);
        });
    }

    const username = getLoggedInUser();
    if (username) {
      setUsername(username);
      console.log("Username got", username);
    }
  }, [id]);

  // Function to save added or updated data from form
  function saveOrUpdateComment(e) {
    e.preventDefault();

    if (!recipeComment.trim()) {
      alert("Comment cannot be empty");
      return;
    }
    const currentTimestamp = new Date().toISOString();

    if (validateForm()) {
      // Add form validation check
      const comment = {
        recipeComment,
        recipeId: recipeId,
        userId: userId,
        createdAt: id ? undefined : currentTimestamp,
        updatedAt: currentTimestamp,
      };

      console.log("Comment data:", comment);

      if (id) {
        // Add a confirmation dialog
        if (window.confirm("Are you sure to update this comment?")) {
          updateComment(id, comment)
            .then((response) => {
              const { recipeId: updatedRecipeId = recipeId, userId: updatedUserId = userId } = response.data || {};              
              comment.recipeId = updatedRecipeId;
              comment.userId = updatedUserId;
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

  //Function to check the form data
  function validateForm() {
    const errorsCopy = {};

    if (!recipeComment.trim()) {
      errorsCopy.recipeComment = "Comment is required";
    }
    setErrors(errorsCopy);
    return Object.keys(errorsCopy).length === 0;
  }

  const handleCancel = () => {
    setRecipeComment("");
    setErrors({});
    navigator("/recipes");
  };

  function pageTitle() {
    if (id) {
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

// import React from "react";
// import { useState } from "react";
// import { createComment, updateComment } from "../services/CommentService";

// import PropTypes from "prop-types";

// const CommentComponent = ({ id, onClose, onSuccess }) => {
//   const [recipeComment, setRecipeComment] = useState("");

//   const [errors, setErrors] = useState({ recipeComment: "" });

//   // Function to save added or updated data from form
//   const saveOrUpdateComment = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Add form validation check
//       const comment = { recipeComment };

//       if (id) {
//         // Add a confirmation dialog
//         if (window.confirm("Are you sure you want to update this comment?")) {
//           console.log(comment);

//           updateComment(id, comment)
//             .then((response) => {
//               console.log("Comment updated:", response.data);
//               onSuccess();
//             })
//             .catch((error) => {
//               console.error("Error updating comment:", error);
//               alert("Failed to update the comment.");
//             });
//         } else {
//           console.log("Update operation cancelled");
//         }
//       } else {
//         // Add a confirmation dialog
//         if (window.confirm("Do you want to save this comment?")) {
//           console.log(comment);

//           createComment(comment)
//             .then((response) => {
//               console.log("Comment created:", response.data);
//               onSuccess();
//             })
//             .catch((error) => {
//               console.error("Error creating comment:", error);
//               alert("Failed to create the comment.");
//             });
//         } else {
//           console.log("Save operation cancelled");
//         }
//       }
//     }
//   };

//   // Function to check the form data
//   function validateForm() {
//     const errorsCopy = {};

//     if (!recipeComment.trim()) {
//       errorsCopy.recipeComment = "Comment is required";
//     }
//     setErrors(errorsCopy);
//     return Object.keys(errorsCopy).length === 0;
//   }

//   return (
//     <div className="modal-backdrop" aria-hidden="true">
//       <div className="modal" role="dialog" aria-labelledby="commentModalTitle">
//         <div className="modal-header">
//           <h5 id="commentModalTitle" className="modal-title">
//             {id ? "Update Comment" : "Add Comment"}
//           </h5>
//           <button
//             type="button"
//             className="btn-close"
//             onClick={onClose}
//           ></button>
//         </div>
//         <div className="modal-body">
//           <label htmlFor="commentInput" className="form-label">
//             Comment:
//           </label>
//           <input
//             id="commentInput"
//             type="text"
//             placeholder="Enter comment"
//             name="recipeComment"
//             value={recipeComment}
//             className={`form-control ${errors.recipeComment ? "is-invalid" : ""}`}
//             onChange={(e) => setRecipeComment(e.target.value)}
//           />
//           {errors.recipeComment && (
//             <div className="invalid-feedback">{errors.recipeComment}</div>
//           )}
//         </div>
//         <div className="modal-footer">
//           <button className="btn btn-primary" onClick={saveOrUpdateComment}>
//             Submit
//           </button>
//           <button className="btn btn-secondary" onClick={onClose}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// CommentComponent.propTypes = {
//   id: PropTypes.string, // For update use case
//   onClose: PropTypes.func.isRequired, // Function to close the modal
//   onSuccess: PropTypes.func.isRequired, // Function to refresh parent state on success
// };

// export default CommentComponent;

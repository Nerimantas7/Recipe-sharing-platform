import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByRecipeId } from "../services/CommentService";
import { getUsername } from "../services/AuthService";

const AllCommentsComponent = ({ recipeId }) => {
  // const [selectedRecipeId, setSelectedRcipeId] = useState(null);
  const [comments, setComments] = useState([]);

  const {id: paramRecipeId} = useParams();
  
  const [usernames, setUsernames] = useState([]);

  const finalRecipeId = recipeId || paramRecipeId;
  console.log("Final Recipe ID (read):", finalRecipeId); // Add this line to check the value

  useEffect(() => {
    if (finalRecipeId) {
      fetchComments(finalRecipeId);
      console.log("Comment details", fetchComments)
    }
  }, [finalRecipeId]);

  function fetchComments(finalRecipeId) {
    getCommentsByRecipeId(finalRecipeId)
      .then((response) => {
        console.log("Fetched comments: ", response.data);
        // setComments(response.data);
  
        // Fetch usernames for all comments
        Promise.all(
          response.data.map((comment) =>
            getUsername(comment.userId).then((username) => ({
              ...comment,
              userName: username || "Unknown",
            }))
          )
        )
          .then((commentsWithUsernames) => {
            console.log("Comments with usernames: ", commentsWithUsernames);
            setComments(commentsWithUsernames); // Update comments with usernames
          })
          .catch((error) => {
            console.error("Error fetching usernames:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }

  const refreshComments = () => {
    fetchComments(); // Refresh the comments list
  };

  return (
    <div
      className="modal fade"
      id="readComments"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              All Comments
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body ">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item bg-light border shadow p-3 mb-3 bg-body rounded ">
                <div>
                  <p className="comment-text">{comment.recipeComment}</p>
                </div>
                <div className="d-flex justify-content-between  ">
                  <p className="mr-auto mb-0"><small>By: </small><em>{comment.userName}</em></p>                
                  <p className="text-end mb-0"><small>Date: {comment.createdAt}</small></p>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            {/* <button type="button" className="btn btn-primary">
                Understood
              </button> */}
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCommentsComponent;

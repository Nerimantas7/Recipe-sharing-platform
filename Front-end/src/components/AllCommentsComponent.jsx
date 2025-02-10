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
  

//   function fetchComments (finalRecipeId) {
    
//       getCommentsByRecipeId(finalRecipeId)
//       .then((response) =>{
//         console.log("Fetched comments: ", response.data);
//         setComments(response.data);
//         const username = getUsername(response.data.userId);
//         console.log("User name: ", username);
//       })     
//     .catch ((error) =>{
//       console.error("Error fetching comments:", error);
//     });
//   };

  // const fetchComments = async (finalRecipeId) => {
  //   try {
  //     // Step 1: Fetch comments for the given recipe
  //     const response = await getCommentsByRecipeId(finalRecipeId);
  //     const commentsData = response.data;
  
  //     console.log("Fetched comments: ", commentsData);
  
  //     // Step 2: Fetch usernames for each comment asynchronously
  //     const usernamesData = await Promise.all(
  //       commentsData.map(async (comment) => {
  //         const username = await getUsername(comment.userId);
  //         return username || "Unknown"; // Handle potential errors
  //       })
  //     );
  
  //     console.log("Usernames for comments: ", usernamesData);
  //     return setUsernames(usernamesData); // Returns an array of usernames
  //   } catch (error) {
  //     console.error("Error fetching usernames:", error);
  //     setComments([]);
  //     setUsernames([])
  //   }
  // };
  
  

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
          <div className="modal-body">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div>
                  <p className="comment-text">{comment.recipeComment}</p>
                </div>
                <div>
                  <p>By:{comment.userName}</p>
                </div>
                <div>
                  <p>Date:{comment.createdAt}</p>
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

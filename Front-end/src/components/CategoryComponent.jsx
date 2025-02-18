import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "../services/CategoryService";

const CategoryComponent = () => {
  const [recipeCategory, setRecipeCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
    getCategoryById(id)
      .then((response) => {
        setRecipeCategory(response.data.recipeCategory);
        setCategoryDescription(response.data.categoryDescription);
        console.log("Fetched category:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
      });
    }
  }, [id]);

  function saveOrUpdateCategory(e) {
    e.preventDefault();

    const category = { recipeCategory, categoryDescription };

    if (!recipeCategory.trim() || !categoryDescription.trim()) {
      alert("Both fields are required.");
      return;
    }

    console.log(category);

    if (id) {
      updateCategory(id, category)
        .then((response) => {
          console.log(response.data);
          navigator("/categories");
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    } else {
      createCategory(category)
        .then((response) => {
          console.log(response.data);
          navigator("/categories");
        })
        .catch((error) => {
          console.error("Error creating category:", error);
        });
    }
  }

  const handleCancel = () => {
    navigator("/categories");
  };

  function pageTitle() {
    if (id) {
      return <h2 className="text-center pt-2">Update Category</h2>;
    } else {
      return <h2 className="text-center pt-2">Add Category</h2>;
    }
  }

  return (
    <div className="container my-4" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Category Name:</label>
                <input
                  type="text"
                  name="recipeCategory"
                  placeholder="Enter Category Name"
                  className="form-control"
                  value={recipeCategory}
                  onChange={(e) => setRecipeCategory(e.target.value)}                  
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Category Description:</label>
                <input
                  type="text"
                  name="categoryDescription"
                  placeholder="Enter Category Description"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="form-control"
                ></input>
              </div>

              <button
                className="btn btn-secondary"
                onClick={(e) => saveOrUpdateCategory(e)}
              >
                Submit
              </button>
              <button className="btn btn-secondary mx-3" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryComponent;

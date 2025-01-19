import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "../services/CategoryService";

const CategoryComponent = () => {
  const navigator = useNavigate();

  const { id } = useParams();

  const [recipeCategory, setRecipeCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  useEffect(() => {
    getCategoryById(id)
      .then((response) => {
        setRecipeCategory(response.data.recipeCategory);
        setCategoryDescription(response.data.categoryDescription);
        console.log("Fetched category:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        navigator("/categories");
      });
  }, [id, navigator]);

  function saveOrUpdateCategory(e) {
    e.preventDefault();

    if (!recipeCategory.trim() || !categoryDescription.trim()) {
      alert("Both fields are required.");
      return;
    }

    const category = { recipeCategory, categoryDescription };

    console.log(category);

    if (id) {
      updateCategory(id, category)
        .then((response) => {
          console.log(response.data);
          navigator(`/edit-category/${id}`);
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

  const pageTitle = id ? "Update Category" : "Add Category";

  return (
    <div className="container my-4">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h2 className="text-center pt-2">{pageTitle}</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Category Name:</label>
                <input
                  type="text"
                  name="recipeCategory"
                  placeholder="Enter Category Name"
                  value={recipeCategory}
                  onChange={(e) => setRecipeCategory(e.target.value)}
                  className="form-control"
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

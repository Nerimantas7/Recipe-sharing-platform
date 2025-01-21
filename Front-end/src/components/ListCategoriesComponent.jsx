import React, { useEffect, useState } from "react";
import { deleteCategory, getAllCategories } from "../services/CategoryService";
import { Link, useNavigate } from "react-router-dom";
import { isAdminUser } from "../services/AuthService";

const ListCategoriesComponent = () => {
  const [categories, setCategories] = useState([]);

  const navigator = useNavigate();

  const isAdmin = isAdminUser();

  useEffect(() => {
    listOfCategories();
  }, []);

  function listOfCategories() {
    getAllCategories()
      .then((response) => {
        console.log("Fetched categories", response.data);
        setCategories(response.data || []);
      })
      .catch((error) => {
        console.log("Error fetching categories:");
        console.error(error);
      });
  }

  function updateCategory(id) {
    navigator(`/edit-category/${id}`);
  }

  function removeCategory(id) {
    deleteCategory(id)
      .then((response) => {
        console.log(response.data);
        listOfCategories();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center my-4">List of Categories</h2>

      {isAdmin && 
        <Link to="/add-category" className="btn btn-outline-secondary mb-2">
          Add Category
        </Link>
      }

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th className="text-center ">Category ID</th>
            <th className="text-center ">Category</th>
            <th className="text-center ">Categories Description</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => 
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.recipeCategory}</td>
              <td>{category.categoryDescription}</td>
              <td>
                {isAdmin && 
                  <button
                    className="btn btn-outline-success"
                    onClick={() => updateCategory(category.id)}
                  >
                    Update
                  </button>
                }
                {isAdmin && 
                  <button
                    className="btn btn-outline-danger mx-3"
                    onClick={() => removeCategory(category.id)}
                  >
                    Delete
                  </button>
                }
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategoriesComponent;

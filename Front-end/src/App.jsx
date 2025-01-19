import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListRecipeComponent from "./components/ListRecipeComponent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import RecipeComponent from "./components/RecipeComponent";
import CategoryComponent from "./components/CategoryComponent";
import ListCategoriesComponent from "./components/ListCategoriesComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn } from "./services/AuthService";

function App() {
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/" />;
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:5173 - pakeisti porta*/}
          <Route path="/" element={<ListRecipeComponent />}></Route>

          {/* http://localhost:5173/recipes - pakeisti porta*/}
          <Route path="/recipes" element={<ListRecipeComponent />}></Route>
          {/* http://localhost:5173/add-recipe - pakeisti porta*/}
          <Route
            path="/add-recipe"
            element={
              <AuthenticatedRoute>
                <RecipeComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          {/* http://localhost:5173/edit-employee/1 */}
          <Route
            path="/edit-recipe/:id"
            element={
              <AuthenticatedRoute>
                <RecipeComponent />
              </AuthenticatedRoute>
            }
          ></Route>

          {/* http://localhost:5173/categories - pakeisti porta*/}
          <Route
            path="/categories"
            element={<ListCategoriesComponent />}
          ></Route>
          {/* http://localhost:5173/add-category - pakeisti porta*/}
          <Route
            path="/add-category"
            element={
              <AuthenticatedRoute>
                <CategoryComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          {/* http://localhost:5173/edit-category/1 - pakeisti porta*/}
          <Route
            path="/edit-category/:id"
            element={
              <AuthenticatedRoute>
                <CategoryComponent />
              </AuthenticatedRoute>
            }
          ></Route>
          {/* http://localhost:5173/register - pakeisti porta*/}
          <Route path="/register" element={<RegisterComponent />}></Route>

          {/* http://localhost:5173/login - pakeisti porta*/}
          <Route path="/login" element={<LoginComponent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;

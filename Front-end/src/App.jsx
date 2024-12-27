import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListRecipeComponent from "./components/ListRecipeComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeComponent from "./components/RecipeComponent";
import CategoryComponent from "./components/CategoryComponent";
import ListCategoriesComponent from "./components/ListCategoriesComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* // http://localhost:5173 - pakeisti porta*/}
          <Route path="/" element={<ListRecipeComponent />}></Route>

          {/* // http://localhost:5173/recipes - pakeisti porta*/}
          <Route path="/recipes" element={<ListRecipeComponent />}></Route>
          {/* // http://localhost:5173/add-recipe - pakeisti porta*/}
          <Route path="/add-recipe" element={<RecipeComponent />}></Route>
          {/* // http://localhost:5173/edit-employee/1 */}
          <Route path="/edit-recipe/:id" element={<RecipeComponent />}></Route>

          {/* // http://localhost:5173/categories - pakeisti porta*/}
          <Route path="/categories" element={<ListCategoriesComponent />}></Route>
          {/* // http://localhost:5173/add-category - pakeisti porta*/}
          <Route path="/add-category" element={<CategoryComponent />}></Route>
          {/* // http://localhost:5173/edit-category/1 */}
          <Route path='/edit-category/:id' element = {<CategoryComponent/>}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;

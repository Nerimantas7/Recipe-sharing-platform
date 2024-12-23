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
          <Route path='/add-recipe' element={<RecipeComponent/>}></Route>
          {/* // http://localhost:5173/add-category - pakeisti porta*/} 
          <Route path='/add-category' element={<CategoryComponent/>}></Route>
          {/* // http://localhost:5173/categories */}
          <Route path='/categories' element = {<ListCategoriesComponent/>}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;

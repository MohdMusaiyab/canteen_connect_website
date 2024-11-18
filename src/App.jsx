import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import AdminProfile from "./pages/admin/AdminProfile";
import Orders from "./pages/admin/Orders";
import CreateProduct from "./pages/admin/CreateProduct";
import Categories from "./pages/admin/Categories";
import SocketProvider from "../socketProvider";

function App() {
  return (
    <SocketProvider>
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        {/* Check the Private Routes */}
        <Route path="/profile/:id" element={<PrivateRoute></PrivateRoute>}>
          <Route path="" element={<AdminProfile></AdminProfile>}></Route>
          <Route path="orders" element={<Orders></Orders>}></Route>
          <Route path="categories" element={<Categories></Categories>}></Route>
        
          <Route
            path="my-products"
            element={<CreateProduct></CreateProduct>}
          ></Route>
        </Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="*" element={<Error></Error>}></Route>
        
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
    </SocketProvider> 
  );
}

export default App;

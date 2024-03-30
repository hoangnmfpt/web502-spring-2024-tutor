import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { TProduct } from "./interfaces/TProducts";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail";
import { createProduct, getProducts } from "./services/product";
import Dashboard from "./pages/admin/Dashboard";
import ProductAdd from "./pages/admin/ProductAdd";

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<TProduct[]>([]);
  useEffect(() => {
    // Cach 2:
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  const handleAddProduct = (product: TProduct) => {
    (async () => {
      const newProduct = await createProduct(product);
      setProducts([...products, newProduct]);
      navigate("/admin");
    })();

    // IIFE =  Immediately Invoked Function Expression
  };
  return (
    <>
      <Header />
      <Routes>
        {/* client */}
        <Route path="/">
          <Route index element={<Shop products={products} />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* admin */}
        <Route path="/admin">
          <Route path="/admin" element={<Dashboard products={products} />} />
          <Route
            path="/admin/add"
            element={<ProductAdd onAdd={handleAddProduct} />}
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

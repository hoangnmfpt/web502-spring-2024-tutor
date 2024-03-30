import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header";
import Shop from "./pages/Shop";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { TProduct } from "./interfaces/TProducts";
import Footer from "./components/Footer/Footer";
import ProductDetail from "./pages/ProductDetail";
import { getProducts } from "./services/product";

function App() {
  const [products, setProducts] = useState<TProduct[]>([]);
  useEffect(() => {
    // Cach 1:
    // fetch("http://localhost:3000/products")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setProducts(data);
    //   });

    // Cach 2:
    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  /**
   * useEffect:
   * 1. Nếu không có dependencies thì callback sẽ được gọi mỗi khi component được render -> render lại liên tục nếu kết hợp setState trong callback.
   * 2. Nếu có dependencies thì callback sẽ được gọi mỗi khi dependencies thay đổi.
   * 3. Nếu dependencies là mảng rỗng thì callback chỉ được gọi 1 lần sau khi component được render.
   */

  return (
    <>
      <Header />

      <Routes>
        <Route index element={<Shop products={products} />} />
        <Route path="/shop" element={<Shop products={products} />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

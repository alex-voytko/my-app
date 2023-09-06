import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./redux/store";

import AppBar from "./components/AppBar";
import Home from "./views/Home";
import AddProduct from "./views/AddProduct";
import NotFound from "./views/NotFound";
import Loader from "./components/Loader";
import "./styles/main.scss";
import Modal from "./components/Modal";
import { fetchProducts } from "./api";
import { useAppDispatch } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();

  const status = useAppSelector((state) => state.products.status);
  const modalOpen = useAppSelector((state) => state.modal.isOpen);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="app">
      {status === "pending" && <Loader />}
      <AppBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {modalOpen && <Modal />}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { IProduct } from "../models";
import { setModal } from "../redux/slice/modal";
import { editProduct } from "../api";

export default function Editing() {
  const dispatch = useAppDispatch();

  const selectedId = useAppSelector((state) => state.products.selectedId);
  const products = useAppSelector((state) => state.products.items);

  const [product, setProduct] = useState<IProduct | undefined>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setProduct({
      ...product,
      [name]: type === "number" ? Number(value) : value,
    } as IProduct);
  };

  const handleSaveCHanges = () => {
    if (product) {
      dispatch(editProduct(product));
    }
    dispatch(setModal(""));
  };

  useEffect(() => {
    if (selectedId) {
      setProduct(products.find((item) => item.id === selectedId));
    }
  }, []);

  return (
    <div className="content editing">
      {product && (
        <>
          <label>
            <p>Name: </p>
            <input
              name="title"
              type="text"
              value={product.title}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>Description:</p>
            <textarea
              name="description"
              value={product.description}
              rows={6}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>Stock: </p>
            <input
              name="stock"
              type="number"
              value={product.stock}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>Price: ($)</p>
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>Rating: </p>
            <input
              name="rating"
              type="number"
              value={product.rating}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>Category: </p>
            <input
              name="category"
              type="text"
              value={product.category}
              onChange={handleInputChange}
            />
          </label>
          <div className="btn-container">
            <button onClick={handleSaveCHanges}>Save</button>
          </div>
        </>
      )}
    </div>
  );
}

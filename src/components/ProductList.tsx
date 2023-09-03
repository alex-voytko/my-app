import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import ProductItem from "./ProductItem";
import { IProduct } from "../models";
import { fetchProducts } from "../api";

export default function ProductList() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.items);
  const status = useAppSelector((state) => state.products.status);

  console.log(status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <table>
      <thead>
        <tr>
          <th className="table-id">ID</th>
          <th className="table-photo">Photo</th>
          <th className="table-name">Name</th>
          <th className="table-descr">Description</th>
          <th className="table-stock">Stock</th>
          <th className="table-category">Category</th>
          <th className="table-rate">Rate</th>
          <th className="table-price">Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product: IProduct) => (
          <ProductItem key={product.id + product.title} product={product} />
        ))}
      </tbody>
    </table>
  );
}

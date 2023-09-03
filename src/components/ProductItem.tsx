import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setSelected } from "../redux/slice/products";

export default function ProductItem({ product }: { product: any }) {
  const dispatch = useAppDispatch();

  const selectedId = useAppSelector((state) => state.products.selectedId);

  const handleSelectProduct = () =>
    dispatch(setSelected(product.id !== selectedId ? product.id : null));

  return (
    <tr
      onClick={handleSelectProduct}
      className={classNames({ selected: product.id === selectedId })}
    >
      <td className="table-id">{product.id}</td>
      <td className="table-photo">
        <img src={product.thumbnail} alt="product" className="product-img" />
      </td>
      <td className="table-name">
        <p>{product.title}</p>
      </td>
      <td className="table-descr">
        <p>{product.description}</p>
      </td>
      <td className="table-stock">
        <p>{product.stock}</p>
      </td>
      <td className="table-category">
        <p>{product.category}</p>
      </td>
      <td className="table-rate">
        <p>{product.rating}</p>
      </td>
      <td className="table-price">
        <p>${product.price}</p>
      </td>
    </tr>
  );
}

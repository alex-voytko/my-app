import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import ProductItem from "./ProductItem";
import { IProduct, Sort } from "../models";
import { nanoid } from "nanoid";
import { tableHeadData } from "../static";

export default function ProductList() {
  const products = useAppSelector((state) => state.products.items);
  const searchQuery = useAppSelector(
    (state) => state.products.searchQuery
  ).toLowerCase();
  const sorts = useAppSelector((state) => state.sorts.sorts);
  const priceRange = useAppSelector((state) => state.filters.priceRange);
  const selectedCategories = useAppSelector(
    (state) => state.filters.selectedCategories
  );
  const isModal = useAppSelector((state) => state.modal.isOpen);

  const [visibleProducts, setVisibleProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setVisibleProducts(
      products.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery) ||
          item.category.toLowerCase().includes(searchQuery)
      )
    );
  }, [searchQuery, products]);

  useEffect(() => {
    setVisibleProducts(
      products.filter((item) => {
        if (selectedCategories.length > 0 && priceRange[1] > 0) {
          return (
            selectedCategories.includes(item.category) &&
            item.price >= priceRange[0] &&
            item.price <= priceRange[1]
          );
        } else if (selectedCategories.length > 0 && priceRange[1] === 0) {
          return selectedCategories.includes(item.category);
        } else if (selectedCategories.length === 0 && priceRange[1] > 0) {
          return item.price >= priceRange[0] && item.price <= priceRange[1];
        } else {
          return item;
        }
      })
    );
  }, [priceRange, selectedCategories, products]);

  useEffect(() => {
    if (isModal === "sorting" && sorts && products) {
      switch (sorts) {
        case Sort.PriceInc:
          setVisibleProducts(
            visibleProducts.slice().sort((a, b) => a.price - b.price)
          );
          break;
        case Sort.PriceDecr:
          setVisibleProducts(
            visibleProducts.slice().sort((a, b) => b.price - a.price)
          );
          break;
        case Sort.StockInc:
          setVisibleProducts(
            visibleProducts.slice().sort((a, b) => a.stock - b.stock)
          );
          break;
        case Sort.StockDecr:
          setVisibleProducts(
            visibleProducts.slice().sort((a, b) => b.stock - a.stock)
          );
          break;
        case Sort.RatingInc:
          setVisibleProducts(
            visibleProducts.slice().sort((a, b) => a.rating - b.rating)
          );
          break;
        case Sort.RatingDecr:
          setVisibleProducts(
            visibleProducts.slice().sort((a, b) => b.rating - a.rating)
          );
          break;

        default:
          setVisibleProducts(products);
          break;
      }
    }
    if (!sorts && products && isModal === "sorting") {
      setVisibleProducts(products);
    }
  }, [sorts, isModal]);

  console.log(visibleProducts);

  return (
    <table>
      <thead>
        <tr>
          {tableHeadData.map(({ className, tableCell }) => (
            <th key={tableCell} className={className}>
              {tableCell}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {visibleProducts.map((product: IProduct) => (
          <ProductItem key={nanoid()} product={product} />
        ))}
      </tbody>
    </table>
  );
}

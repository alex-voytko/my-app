import { useEffect, useState } from "react";
import classNames from "classnames";
import ReactSlider from "react-slider";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { setModal } from "../redux/slice/modal";
import { setFilters } from "../redux/slice/filters";

export default function Filters() {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.filters);
  const products = useAppSelector((state) => state.products.items);

  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [priceRange, setPriceRange] = useState<[number, number]>(
    filters.priceRange
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters.selectedCategories
  );

  useEffect(() => {
    setMaxPrice(
      Math.max.apply(
        null,
        products.map((item) => item.price)
      )
    );
    setCategories(
      products.reduce((acc, cur) => {
        if (!acc.includes(cur.category as never)) {
          acc.push(cur.category as never);
        }
        return acc;
      }, [])
    );
  }, []);

  console.log(priceRange);

  return (
    <div className="content filters">
      <h2>Filters</h2>
      {maxPrice > 0 && (
        <>
          <h3>Select price range: </h3>
          <ReactSlider
            className="horizontal-slider"
            thumbClassName="example-thumb"
            trackClassName="example-track"
            defaultValue={priceRange}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => (
              <div {...props}>${state.valueNow}</div>
            )}
            pearling
            minDistance={100}
            min={0}
            max={maxPrice}
            onChange={(val) => setPriceRange(val as [number, number])}
          />
        </>
      )}
      <h3>Pick categories: </h3>
      <ul className="picker-list">
        {categories.map((item) => (
          <li
            key={item}
            className={classNames({
              selected: selectedCategories.includes(item),
            })}
            onClick={() =>
              setSelectedCategories(
                selectedCategories.includes(item)
                  ? selectedCategories.filter((el) => el !== item)
                  : selectedCategories.concat([item])
              )
            }
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="btn-container">
        <button
          className="clear"
          onClick={() => {
            setSelectedCategories([]);
            setPriceRange([0, maxPrice]);
            dispatch(
              setFilters({ selectedCategories: [], priceRange: [0, maxPrice] })
            );
            dispatch(setModal(""));
          }}
        >
          Reset filters
        </button>
        <button
          className="apply"
          onClick={() => {
            dispatch(setFilters({ selectedCategories, priceRange }));
            dispatch(setModal(""));
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

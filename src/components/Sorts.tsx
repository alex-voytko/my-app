import classNames from "classnames";
import { setSorts } from "../redux/slice/sorts";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { sortData } from "../static";

export default function Sorts() {
  const dispatch = useAppDispatch();

  const sortVariant = useAppSelector((state) => state.sorts.sorts);

  return (
    <div className="content sorts">
      <h2>Sorts</h2>
      <ul className="picker-list">
        {sortData.map((item) => (
          <li
            key={item}
            onClick={() =>
              dispatch(setSorts(item === sortVariant ? "none" : item))
            }
            className={classNames({ selected: item === sortVariant })}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

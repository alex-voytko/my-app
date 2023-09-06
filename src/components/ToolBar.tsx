import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { deleteProduct } from "../api";
import { setModal } from "../redux/slice/modal";
import Icon from "./Icon";
import { Icons } from "../models";
import { setSearchQuery } from "../redux/slice/products";

export default function ToolBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedId = useAppSelector((state) => state.products.selectedId);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  return (
    <div className="toolbar">
      <div>
        <button
          disabled={selectedId === null}
          onClick={() => dispatch(setModal("editing"))}
        >
          Edit
        </button>
        <button
          disabled={selectedId === null}
          onClick={() => dispatch(deleteProduct(selectedId as number))}
        >
          Delete
        </button>
        <button onClick={() => dispatch(setModal("filters"))}>Filters</button>
        <button onClick={() => dispatch(setModal("sorting"))}>Sorts</button>
        <button onClick={() => navigate("/add")}>Add</button>
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
        <Icon name={Icons.Search} />
      </div>
    </div>
  );
}

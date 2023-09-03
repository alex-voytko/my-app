import { useAppSelector, useAppDispatch } from "../redux/store";
import { deleteProduct } from "../api";
import { setModal } from "../redux/slice/modal";

export default function ToolBar() {
  const dispatch = useAppDispatch();

  const selectedId = useAppSelector((state) => state.products.selectedId);

  const handleDeleteProduct = () =>
    dispatch(deleteProduct(selectedId as number));

  const handleOpenEditing = () => dispatch(setModal("editing"));

  return (
    <div className="toolbar">
      <button disabled={selectedId === null} onClick={handleOpenEditing}>
        Edit
      </button>
      <button disabled={selectedId === null} onClick={handleDeleteProduct}>
        Delete
      </button>
      <button>Filters</button>
      <button>Sorts</button>
      <button>Add</button>
    </div>
  );
}

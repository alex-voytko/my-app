import { createPortal } from "react-dom";
import { useAppSelector } from "../redux/store";
import { useAppDispatch } from "../redux/store";
import Editing from "./Editing";
import Filters from "./Filters";
import Sorts from "./Sorts";

import { setModal } from "../redux/slice/modal";

export default function Modal() {
  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector((state) => state.modal.isOpen);

  const onBackDropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(setModal(""));
    }
  };

  return createPortal(
    <div className="backdrop" onClick={onBackDropClick}>
      <div className="modal">
        {modalOpen === "editing" && <Editing />}
        {modalOpen === "filters" && <Filters />}
        {modalOpen === "sorting" && <Sorts />}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLDivElement
  );
}

import ProductList from "../components/ProductList";
import ToolBar from "../components/ToolBar";

export default function Home() {
  return (
    <div className="page-wrapper">
      <h2>Propducts</h2>
      <ToolBar />
      <ProductList />
    </div>
  );
}

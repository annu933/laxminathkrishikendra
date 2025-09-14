import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/product/page";
import CreateProduct from "./pages/product/create"; // 👈 new page
import Inventory from "./pages/inventory/page";
import InventoryCreate from "./pages/inventory/create";
import InventoryUpload from "./pages/inventory/importInventory";
import EditInventory from "./pages/inventory/edit";
import SaleForm from "./pages/sale/create/page";
import Dashboard from "./pages/dashboard/page";
import Sales from "./pages/sale/page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/create" element={<InventoryCreate />} />
        <Route path="/inventory/import" element={<InventoryUpload />} />
        <Route path="/inventory/edit/:id" element={<EditInventory />} />
        <Route path="/sale" element={<Sales />} />
        <Route path="/sale/create" element={<SaleForm />} />
      </Routes>
    </Router>
  );
}
export default App;

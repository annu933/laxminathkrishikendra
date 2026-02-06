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
import PurchaseCreate from "./pages/purchase/create";
import Purchases from "./pages/purchase/page";
import PurchaseUpdate from "./pages/purchase/edit";
import UpdateProduct from "./pages/product/edit";
import UpdateSales from "./pages/sale/edit/page";
import Navbar from "./components/Navbar";
import Register from "./pages/User/register";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* product */}
          <Route path="/product" element={<Product />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:id" element={<UpdateProduct />} />
          {/* Inventory */}
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/create" element={<InventoryCreate />} />
          <Route path="/inventory/import" element={<InventoryUpload />} />
          <Route path="/inventory/edit/:id" element={<EditInventory />} />
          {/* Sales */}
          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/create" element={<SaleForm />} />
          <Route path="/sales/edit/:id" element={<UpdateSales />} />
          {/* Purchases */}
          <Route path="/purchase" element={<Purchases />} />
          <Route path="/purchase/create" element={<PurchaseCreate />} />
          <Route path="/purchase/edit/:id" element={<PurchaseUpdate />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;

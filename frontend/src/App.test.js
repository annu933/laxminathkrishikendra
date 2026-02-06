import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock axios to avoid ESM issues
jest.mock("axios", () => ({
  create: () => ({
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  }),
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mock pages to avoid rendering their complex children/dependencies
jest.mock("./pages/dashboard/page", () => () => <div>Dashboard Page</div>);
jest.mock("./pages/product/page", () => () => <div>Product Page</div>);
jest.mock("./pages/inventory/page", () => () => <div>Inventory Page</div>);
jest.mock("./pages/sale/page", () => () => <div>Sales Page</div>);
jest.mock("./pages/purchase/page", () => () => <div>Purchase Page</div>);
jest.mock("./pages/product/create", () => () => <div>Create Product</div>);
jest.mock("./pages/inventory/create", () => () => <div>Create Inventory</div>);
jest.mock("./pages/inventory/importInventory", () => () => <div>Import Inventory</div>);
jest.mock("./pages/inventory/edit", () => () => <div>Edit Inventory</div>);
jest.mock("./pages/sale/create/page", () => () => <div>Create Sale</div>);
jest.mock("./pages/purchase/create", () => () => <div>Create Purchase</div>);
jest.mock("./pages/purchase/edit", () => () => <div>Edit Purchase</div>);
jest.mock("./pages/product/edit", () => () => <div>Edit Product</div>);
jest.mock("./pages/sale/edit/page", () => () => <div>Edit Sale</div>);


test("renders app structure with navbar", () => {
  render(<App />);
  const linkElement = screen.getByText(/Laxminath Krishi Kendra/i);
  expect(linkElement).toBeInTheDocument();
});

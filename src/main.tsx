import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

import LoginPage from "./page/LoginPage";
import UsersPage from "./page/UsersPage";
import { LoadingProvider } from "./contexts/LoadingContext.tsx";
import NotFoundPage from "./page/NotFoundPage";
import MainPage from "./page/MainPage/index.tsx";
import ProductsPage from "./page/ProductsPage/index.tsx";
import ProductCategoriesPage from "./page/ProductCategoriesPage/index.tsx";
import StocksPage from "./page/StocksPage/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/users" element={<UsersPage />} />

          <Route path="/products" element={<ProductsPage />} />

          <Route path="/product-categories" element={<ProductCategoriesPage />} />

          <Route path="/stocks" element={<StocksPage />} />

          {/* No match / 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  </StrictMode>
);

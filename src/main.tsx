import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import { LoadingProvider } from "./contexts/LoadingContext.tsx";
import { MessageProvider } from "./contexts/MessageContext.tsx";
import LoginPage from "./page/LoginPage";
import MainPage from "./page/MainPage/index.tsx";
import NotFoundPage from "./page/NotFoundPage";
import ProductCategoriesPage from "./page/ProductCategoriesPage/index.tsx";
import ProductsPage from "./page/ProductsPage/index.tsx";
import SettingsPage from './page/SettingsPage/index.tsx';
import StocksPage from "./page/StocksPage/index.tsx";
import UsersPage from "./page/UsersPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product-categories" element={<ProductCategoriesPage />} />
      <Route path="/stocks" element={<StocksPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MessageProvider>
      <LoadingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoadingProvider>
    </MessageProvider>
  </StrictMode>
);

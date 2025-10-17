import '@ant-design/v5-patch-for-react-19';
import { Route, Routes } from "react-router";

import MainPage from "../page/HomePage/index.tsx";
import LoginPage from "../page/LoginPage";
import NotFoundPage from "../page/NotFoundPage";
import ProductCategoriesPage from "../page/ProductCategoriesPage/index.tsx";
import ProductsPage from "../page/ProductsPage/index.tsx";
import SettingsPage from '../page/SettingsPage/index.tsx';
import StockTransactionsPage from "../page/StockTransactionsPage/index.tsx";
import UsersPage from "../page/UsersPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product-categories" element={<ProductCategoriesPage />} />
            <Route path="/stocks" element={<StockTransactionsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;

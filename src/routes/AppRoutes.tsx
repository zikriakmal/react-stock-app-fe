import { Route, Routes } from "react-router";
import {
    LoginPage,
    MainPage,
    NotFoundPage,
    ProductCategoriesPage,
    ProductsPage,
    SettingsPage,
    StockTransactionsPage,
    UsersPage
} from '../page';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product-categories" element={<ProductCategoriesPage />} />
            <Route path="/stock-transactions" element={<StockTransactionsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;

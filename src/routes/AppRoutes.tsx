import { Route, Routes } from "react-router";
import {
    LoginPage,
    MainPage,
    NotFoundPage,
    ProductCategoriesPage,
    ProductsPage,
    SettingsPage,
    StockReportsPage,
    StockTransactionsPage,
    UsersPage
} from '../modules';

const AppRoutes = () => {
    return (
        <Routes>
            {/* auth module */}
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* inventory management module */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product-categories" element={<ProductCategoriesPage />} />
            <Route path="/stock-transactions" element={<StockTransactionsPage />} />
            <Route path='/stock-reports' element={<StockReportsPage />} />

            {/* administrations module */}
            <Route path="/users" element={<UsersPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;

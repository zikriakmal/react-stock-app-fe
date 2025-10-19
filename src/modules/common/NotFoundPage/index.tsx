import type React from "react";
import { Link } from "react-router";

const NotFoundPage: React.FC<any> = () => {
    return (
        <div
            style={{ background: "url('/login-page.jpg') no-repeat", backgroundSize: 'cover' }}
            className="flex flex-col items-center justify-center h-screen text-center bg-pink-900">
            <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
            <p className="text-gray-500 mb-6">Page not found</p>
            <Link to={-1 as any} className="text-white underline">
                Go back home
            </Link>
        </div>
    );
}

export default NotFoundPage;
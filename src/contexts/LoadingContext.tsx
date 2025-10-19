import { createContext, useContext, useState } from "react";
import Loading from "../components/molecules/Loading";

interface LoadingContextType {
    isLoading: boolean;
    showLoading: (text?: string) => void;
    hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const showLoading = () => {
        setIsVisible(true);
        requestAnimationFrame(() => setIsLoading(true));
    };

    const hideLoading = () => {
        setIsLoading(false);
        // Wait for fade-out animation before hiding element entirely
        setTimeout(() => setIsVisible(false), 300);
    };

    return (
        <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
            {children}

            {isVisible && (
                <div
                    className={`fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isLoading ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Loading />
                </div>
            )}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};

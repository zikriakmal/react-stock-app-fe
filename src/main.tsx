import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";

import { LoadingProvider } from "./contexts/LoadingContext.tsx";
import { MessageProvider } from "./contexts/MessageContext.tsx";
import AppRoutes from './routes/AppRoutes.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MessageProvider>
      <LoadingProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LoadingProvider>
    </MessageProvider>
  </StrictMode>
);

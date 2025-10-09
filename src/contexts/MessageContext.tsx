import React, { createContext, useContext } from 'react';
import { message } from 'antd';

interface MessageContextType {
    success: (content: string) => void;
    error: (content: string) => void;
    info: (content: string) => void;
    warning: (content: string) => void;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (content: string) => messageApi.open({ type: 'success', content });
    const error = (content: string) => messageApi.open({ type: 'error', content });
    const info = (content: string) => messageApi.open({ type: 'info', content });
    const warning = (content: string) => messageApi.open({ type: 'warning', content });

    return (
        <MessageContext.Provider value={{ success, error, info, warning }}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    const ctx = useContext(MessageContext);
    if (!ctx) throw new Error('useMessage must be used within a MessageProvider');
    return ctx;
};

// Clock.tsx
import { useEffect, useState, type JSX } from "react";

export default function Clock(): JSX.Element {
    const [now, setNow] = useState<Date>(() => new Date());

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return (
        <div className="sm:w-40 items-center justify-center flex" style={{
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: 6,
            background: "#111827",
            color: "white",
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial",
            fontSize: 16,
            fontWeight: 600
        }}>
            <p className="text-center font-mono">
                {hours}
                <span className="animate-pulse">:</span>
                {minutes}
            </p>
        </div>
    );
}

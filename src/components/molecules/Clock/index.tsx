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
        <div className="sm:w-40 rounded-sm inline-block  items-center justify-center bg-[#111827]" style={{}}>
            <p className="text-sm py-2 px-2 text-center font-mono font-bold text-white">
                {hours}
                <span className="animate-pulse">:</span>
                {minutes}
            </p>
        </div>
    );
}

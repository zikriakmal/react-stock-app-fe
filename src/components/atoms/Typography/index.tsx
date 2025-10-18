import type { PropsWithChildren } from "react"
import type React from "react"

const Typography: React.FC<PropsWithChildren> = (props) => {
    return (
        <p className="text-black">
            {props.children}
        </p>
    )
}

export default Typography;
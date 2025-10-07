import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
    return (
        <div className="absolute w-full h-full z-50">
            <div className="flex flex-1 flex-col items-center animate-pulse bg-black/40 justify-center h-full w-full">
                <Spin indicator={<Loading3QuartersOutlined style={{ fontSize: 36, color: "pink" }} spin />} size="large" />
            </div>
        </div>
    )
}

export default Loading;
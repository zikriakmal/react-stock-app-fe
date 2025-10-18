import { Button as AntdButton, type ButtonProps } from "antd";
import type React from "react";
import type { JSX } from "react";

interface ButtonCustomProps extends ButtonProps { }

const Button: React.FC<ButtonCustomProps> = (props): JSX.Element => {
    return (
        <AntdButton onClick={props.onClick} >
            <p>{props.children}</p>
        </AntdButton>
    )
}

export default Button;
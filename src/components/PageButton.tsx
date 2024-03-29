import React, { ReactNode } from "react";

type ButtonProp =
{
    onClick?: () => void;
    children: ReactNode;
}

function PageButton({onClick, children}: ButtonProp)
{
    return(
        <div style = {{textAlign: "left"}}>
        <button
            onClick = {onClick}
            type = {"button"}>
            {children}
        </button>
        </div>
    );
}

export default PageButton;
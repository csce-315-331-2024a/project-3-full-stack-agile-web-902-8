import React, { ReactNode } from "react";

type ButtonProp =
{
    onClick?: () => void;
    children: ReactNode;
}

function PageButton({onClick, children}: ButtonProp)
{
    return(
        <button
            onClick = {onClick}
            type = {"button"}>
            {children}
        </button>
    );
}

export default PageButton;
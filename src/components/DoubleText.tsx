import React, { ReactNode } from "react";
import SideBar from "./SideBar";

type TextProp = 
{
    block1: ReactNode;
    block2: ReactNode;
}

function DoubleText({block1, block2}: TextProp)
{
    return(
        <div style = {{display: "flex"}}>
            <div style = {{width: "150px"}}>{block1}</div>
            <div style = {{justifyContent: "left", alignItems: "left", width: "100%"}}>{block2}</div>
        </div>
    );
}

export default DoubleText;
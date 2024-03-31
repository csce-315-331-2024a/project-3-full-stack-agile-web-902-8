import React, { ReactNode } from "react";
import SideBar from "./SideBar";

type TextProp = 
{
    sidebar: typeof SideBar;
    block: ReactNode;
}

function Sidebar({sidebar, block}: TextProp)
{
    return(
        <div style = {{display: "flex"}}>
            <div style = {{width: "150px"}}>{block1}</div>
            <div style = {{justifyContent: "left", alignItems: "left", width: "100%"}}>{block2}</div>
        </div>
    );
}

export default DoubleText;

import React, { ReactNode } from "react";

interface SideBarMainProp {
    sidebar: ReactNode;
    main: ReactNode;
}

function SideBarMain({sidebar, main}: SideBarMainProp)
{
    return(
        <div style = {{display: "flex"}}>
            <div style = {{width: "150px"}}>{sidebar}</div>
            <div style = {{display : "flex", justifyContent : "center", width: "100%"}}>
                <div style={{width: "100%"}}>{main}</div>
            </div>
        </div>
    );
}

export default SideBarMain;

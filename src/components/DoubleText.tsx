import React, { ReactNode } from "react";

type TextProp = 
{
    block1: ReactNode;
    block2: ReactNode;
}

function DoubleText({block1, block2}: TextProp)
{
    return(
        <div style = {{display: "flex"}}>
            <div style = {{flex: 1}}>{block1}</div>
            <div style = {{flex: 1}}>{block2}</div>
        </div>
    );
}

export default DoubleText;
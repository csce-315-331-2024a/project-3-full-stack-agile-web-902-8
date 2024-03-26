import React from "react"

type HeadingProp = 
{
    navList: string[];
}

function Heading({navList}: HeadingProp)
{
    return(
        <nav>
            <ul>
                {navList.map((item) =>(
                    <li>
                        {item}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Heading;




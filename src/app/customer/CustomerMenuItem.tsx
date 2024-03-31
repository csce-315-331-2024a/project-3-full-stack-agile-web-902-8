import React from "react";

type MenuItemProp = {
    name: string;
    onClick?: () => void;
}

/**
 * @param name the name of the menu item
 * @param onClick the function to change the popup
 */
function CustomerMenuItem({name, onClick}: MenuItemProp) {
    return (
        <button onClick={onClick}>{name}</button>
    );
}

export default CustomerMenuItem;

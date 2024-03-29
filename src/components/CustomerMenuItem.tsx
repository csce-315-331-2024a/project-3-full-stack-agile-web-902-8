import React from "react";
import styles from "./page.module.css";

type MenuItemProp = {
    name: string;
    onClick?: () => void;
}

function CustomerMenuItem({name, onClick}: MenuItemProp) {
    return (
        <button onClick={onClick}>{name}</button>
    );
}

export default CustomerMenuItem;
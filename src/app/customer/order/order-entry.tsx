import React from "react";
import customerStyles from "@/app/customer/page.module.css";

type OrderEntryProp = {
    name: string;
    qty: number;
    price: number;
}

function OrderEntry({name, qty, price} : OrderEntryProp) {
    return (
        <p></p>
    );
}

export default OrderEntry;

import React from "react";
import TopBar from "@/components/TopBar";

function CustomerNav() {
    const pages = ["menu", "order", "checkout"];
    const hrefs = ["/customer", "/customer/order", "/customer/checkout"];

    return (
        <TopBar names={pages} hrefs={hrefs}/>
    );
}

export default CustomerNav;

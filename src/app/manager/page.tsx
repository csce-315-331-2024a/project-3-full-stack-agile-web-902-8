import React from "react";
import Heading from "@/components/Heading";
import PageButton from "@/components/PageButton";
import DoubleText from "@/components/DoubleText";

export default function Manager() {
  const Items = ['Home', 'Menu', 'Inventory', 'Order History', 'Reports'];
  const Links = ['/', '/', '/', '/', '/'];
  return (

    <div>
      <DoubleText 
      block1 = 
        <Heading names={Items} hrefs={Links}/>
      block2 =
        <PageButton>Logout</PageButton>/>

      <h1>Manager Page</h1>
      
      <div>
        <PageButton>Refresh</PageButton>
      </div>
      <DoubleText block1 = "block1" block2 = "block2"/>

      <p>This is the manager page content.</p>
    </div>
  );
}

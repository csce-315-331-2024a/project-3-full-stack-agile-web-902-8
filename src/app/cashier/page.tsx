'use client';
// TODO: Consider separating client-side and server-side code for much better performance

import React, { useEffect, useState } from "react";

import LogoutButton from "@/components/LogoutButton";
import CashierCategoryBar from "@/components/CashierCategoryBar";
import CashierItemGrid from "@/components/CashierItemGrid";
import CashierOrderTable from "@/components/CashierOrderTable";

import componentStyles from '@/components/component.module.css';

import { MenuItem, Ingredient, InventoryItem, Seasonal, Order } from "@/lib/models";

// DEBUG: Placeholder menu item data:
const cheese = new Ingredient(new InventoryItem(1, "Cheese", 0.5, 100, 10, 200), 1);
const beefPatty = new Ingredient(new InventoryItem(2, "Beef Patty", 1, 100, 10, 200), 1);
const bun = new Ingredient(new InventoryItem(3, "Bun", 0.25, 100, 10, 200), 1);
const seasonalSummer = new Seasonal(Date.now(), Date.now() + 3 * 30 * 24 * 60 * 60 * 1000, false);

const sampleMenuItems: MenuItem[] = [
  new MenuItem(1, "Classic Burger", "Burgers", 9.99, 5.00, 5, [cheese, beefPatty, bun], seasonalSummer),
  new MenuItem(2, "Veggie Burger", "Burgers", 8.99, 4.00, 4, [cheese, bun], seasonalSummer),
  new MenuItem(3, "French Fries", "Sides", 2.99, 1.00, 5, [], seasonalSummer),
  new MenuItem(4, "Soft Drink", "Drinks", 1.99, 0.50, 5, [], seasonalSummer),
];

// DEBUG: Placeholder order creation:
function placeOrder(currentOrder: OrderEntry[]): void {
  console.log("Placing order with items:");
  currentOrder.forEach((orderEntry) => {
    console.log(`${orderEntry.quantity}x ${orderEntry.item.name}`);
  });
}

export interface OrderEntry{
  item: MenuItem;
  quantity: number;
}

export default function Cashier() {
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<MenuItem[]>(sampleMenuItems);
  const [categoryItems, setCategoryItems] = useState<MenuItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderEntry[]>([]);

  useEffect(() => {
    // TODO: Fetch categories from the server
    const uniqueCategories = Array.from(new Set(items.map((item) => item.type)));
    setCategories(uniqueCategories);
    
    if(categories.length > 0){
      setCategory(categories[0]);
    }
  }, []);
  // TODO: should have initial items
  useEffect(() => {
    const itemsInCategory = items.filter((item) => item.type === category);
    setCategoryItems(itemsInCategory);
  }, [category]);

  return (
    <main>
      <LogoutButton />
      <CashierCategoryBar categories={categories} category={category} setCategory={setCategory} />
      <CashierItemGrid categoryItems={categoryItems} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
      <CashierOrderTable currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} />
      <button className={componentStyles.placeOrder + ' ' + componentStyles.card} onClick={() => placeOrder(currentOrder)}>
        Place Order
      </button>
    </main>
  );
}

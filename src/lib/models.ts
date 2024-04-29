export class User {
    id: number;
    username: string;
    password: string;
    role: string;
    hourlySalary: number;
    hours: number;

    constructor(
        id: number,
        username: string,
        password: string,
        role: string,
        hourlySalary: number,
        hours: number
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.hourlySalary = hourlySalary;
        this.hours = hours;
    }
}

export type OrderStatus = 'FILLED' | 'PENDING' | 'CANCELED';

export class OrderItem {
    quantity: number;
    item: MenuItem;

    constructor(_quantity: number, _item: MenuItem) {
        this.quantity = _quantity;
        this.item = _item;
    }
}

export class Order {
    id: number;
    timestamp: Date;
    discount: number;
    total: number;
    items: OrderItem[];
    status: OrderStatus;

    constructor(
        id: number,
        timestamp: Date,
        discount: number,
        total: number,
        items: OrderItem[],
        status: OrderStatus
    ) {
        this.id = id;
        this.timestamp = timestamp;
        this.discount = discount;
        this.total = total;
        this.items = items;
        this.status = status;
    }
}

export class Ingredient {
    inventoryItem: InventoryItem;
    amount: number;

    constructor(inventoryItem: InventoryItem, amount: number) {
        this.inventoryItem = inventoryItem;
        this.amount = amount;
    }
}

export class Seasonal {
    startDate: number;
    endDate: number;
    recurring: boolean;

    constructor(startDate: number, endDate: number, recurring: boolean) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.recurring = recurring;
    }
}

export class MenuItem {
    id: number;
    name: string;
    type: string;
    description: string;
    price: number;
    netPrice: number;
    popularity: number;
    ingredients: Ingredient[];
    seasonal: Seasonal | null;
    weather?: string;

    constructor(
        id: number,
        name: string,
        type: string,
        description: string,
        price: number,
        netPrice: number,
        popularity: number,
        ingredients: Ingredient[],
        seasonal: Seasonal | null,
        weather?: string
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = price;
        this.netPrice = netPrice;
        this.popularity = popularity;
        this.ingredients = ingredients;
        this.seasonal = seasonal;
        this.weather = weather;
    }
}

export class InventoryItem {
    id: number;
    name: string;
    averageCost: number;
    quantity: number;
    minQuantity: number;
    maxQuantity: number;

    constructor(
        id: number,
        name: string,
        averageCost: number,
        quantity: number,
        minQuantity: number,
        maxQuantity: number
    ) {
        this.id = id;
        this.name = name;
        this.averageCost = averageCost;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.maxQuantity = maxQuantity;
    }
}

export class AggregateItem {
    id: number;
    name: string;
    qty: number;

    constructor(id: number, name: string, qty: number) {
        this.id = id;
        this.name = name;
        this.qty = qty;
    }
}

export class aggregateInventoryItem {
    id: number;
    name: string;
    qty: number;

    constructor(id: number, name: string, qty: number) {
        this.id = id;
        this.name = name;
        this.qty = qty;
    }
}

export class frequentlySoldPairs {
    item1Name: string;
    item2Name: string;
    frequency: number;

    constructor(item1Name: string, item2Name: string, frequency: number) {
        this.item1Name = item1Name;
        this.item2Name = item2Name;
        this.frequency = frequency;
    }
}

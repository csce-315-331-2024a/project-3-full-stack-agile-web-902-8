
export class User {
    id: number;
    username: string;
    password: string;
    role: number;
    hourlySalary: number;
    hours: number;
    
    constructor(
        id: number,
        username: string,
        password: string,
        role: number,
        hourlySalary: number,
        hours: number,
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.hourlySalary = hourlySalary;
        this.hours = hours;
    }
}

export class OrderItem {
    quantity: number;
    item: MenuItem;
    
    constructor(_quantity: number, _item: MenuItem) {
        this.quantity = _quantity;
        this.item = _item
    }
}

export class Order {
    id: number;
    timestamp: Date;
    discount: number;
    total: number;
    items: OrderItem[];
    
    constructor (
        id: number,
        timestamp: Date,
        discount: number,
        total: number,
        items: OrderItem[],
    ) {
        this.id = id;
        this.timestamp = timestamp;
        this.discount = discount;
        this.total = total;
        this.items = items;
    }
}

export class Ingredient {
    inventoryItem: InventoryItem;
    amount: number;
    
    constructor (
        inventoryItem: InventoryItem,
        amount: number,
    ) {
        this.inventoryItem = inventoryItem;
        this.amount = amount;
    }
}

export class Seasonal {
    startDate: Date;
    endDate: Date;
    recurring: boolean;
    
    constructor (
        startDate: Date,
        endDate: Date,
        recurring: boolean,
    ) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.recurring = recurring;
    }
}

export class MenuItem {
    id: number;
    name: string;
    type: string;
    price: number;
    netPrice: number;
    popularity: number;
    ingredients: Ingredient[];
    seasonal: Seasonal;
    
    constructor (
        id: number,
        name: string,
        type: string,
        price: number,
        netPrice: number,
        popularity: number,
        ingredients: Ingredient[],
        seasonal: Seasonal,
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.price = price;
        this.netPrice = netPrice;
        this.popularity = popularity;
        this.ingredients = ingredients;
        this.seasonal = seasonal;
    }
}

export class InventoryItem {
    id: number;
    name: string;
    averageCost: number;
    quantity: number;
    minQuantity: number;
    maxQuantity: number;
    
    constructor (
        id: number,
        name: string,
        averageCost: number,
        quantity: number,
        minQuantity: number,
        maxQuantity: number,
    ) {
        this.id = id;
        this.name = name;
        this.averageCost = averageCost;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.maxQuantity = maxQuantity;
    }
}

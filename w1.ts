class MenuItem {
    constructor(
        private _name: string,
        private _price: number,
        private _category: string
    ) {}
    get price(): number {
        return this._price;
    }
    get name(): string {
        return this._name;
    }
    get category(): string {
        return this._category;
    }
    getMenuInfo(): string {
        return `${this._name} - ${this._price.toFixed(2)} - ${this._category}`;
    }
}
class Order {
    private items: { item: MenuItem; quantity: number }[] = [];

    addItem(item: MenuItem, quantity: number): void {
        this.items.push({ item, quantity });
    }

    getItems(): { item: MenuItem; quantity: number }[] {
        return this.items;
    }
    calculateTotal(): number {
        return this.items.reduce((total, entry) => {
            return total + entry.item.price * entry.quantity;
        }, 0);
    }
}
class Restaurant {
    constructor(
        private _name: string,
        private menu: MenuItem[] 
    ) {}
    processOrder(order: Order): void {
        const total = order.calculateTotal();
        const discount = total > 500 ? total * 0.01 : 0;
        const netPrice = total - discount;
        console.log("Order Details:");
        order.getItems().forEach(entry => {
            const itemTotal = entry.item.price * entry.quantity;
            console.log(
                `${entry.quantity} x ${entry.item.name} - ${entry.item.price.toFixed(2)} - ${entry.item.category} = $${itemTotal.toFixed(2)}`
            );
        });

        console.log("----------------------------------------");
        console.log(`Total: $${total.toFixed(2)}`);
        
        if (discount > 0) {
            console.log(`Net Price (1% Disc): $${netPrice.toFixed(2)}`);
        } else {
            console.log(`Net Price: $${netPrice.toFixed(2)}`);
        }
    }
}
class Customer {
    constructor(private name: string) {}
    placeOrder(restaurant: Restaurant, order: Order): void {
        console.log(`${this.name} placed an order for:`);
        restaurant.processOrder(order);
    }
}
const pizza = new MenuItem("Pizza", 250.00, "Main Course");
const salad = new MenuItem("Salad", 150.00, "Appetizer");
const restaurant = new Restaurant("My Restaurant", [pizza, salad]);
const aliceOrder = new Order();
aliceOrder.addItem(pizza, 2);
aliceOrder.addItem(salad, 1);
const customer = new Customer("Alice");
customer.placeOrder(restaurant, aliceOrder);
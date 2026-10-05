abstract class TravelPackage {
  private _packageId: string;
  private _packageName: string;
  protected _basePrice: number; 

  constructor(id: string, name: string, basePrice: number) {
    this._packageId = id;
    this._packageName = name;
    this._basePrice = basePrice;
  }
  getPackageId(): string {
    return this._packageId;
  }
  getPackageName(): string {
    return this._packageName;
  }
  getBasePrice(): number {
    return this._basePrice;
  }
  abstract calculatePrice(people: number): number;
  abstract getTypeText(): string;
  abstract getDiscountText(): string;
}
class OneDayTrip extends TravelPackage {
  calculatePrice(people: number): number {
    let total = this._basePrice * people;
    if (people >= 5) {
      total = total * 0.9; 
    }
    return total;
  }

  getTypeText(): string {
    return "One-Day";
  }

  getDiscountText(): string {
    return "10% Disc";
  }
}
class OvernightTrip extends TravelPackage {
  private _numberOfNights: number;

  constructor(id: string, name: string, basePrice: number, nights: number) {
    super(id, name, basePrice); 
    this._numberOfNights = nights;
  }
  getNumberOfNights(): number {
    return this._numberOfNights;
  }
  calculatePrice(people: number): number {
    let total = this._basePrice * people * this._numberOfNights;
    if (this._numberOfNights >= 3) {
      total = total * 0.85; 
    }
    return total;
  }
  getTypeText(): string {
    return "Overnight - " + this._numberOfNights + " Nights";
  }
  getDiscountText(): string {
    return "15% Disc";
  }
}
class Customer {
  private _customerId: string;
  private _name: string;
  private _phone: string;

  constructor(id: string, name: string, phone: string) {
    this._customerId = id;
    this._name = name;
    this._phone = phone;
  }
  getCustomerId(): string {
    return this._customerId;
  }
  getName(): string {
    return this._name;
  }
  getPhone(): string {
    return this._phone;
  }
}
class Traveler {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class BookingDetail {
  private _travelers: Traveler[] = [];

  addTraveler(name: string, age: number): void {
    this._travelers.push(new Traveler(name, age));
  }

  getCount(): number {
    return this._travelers.length;
  }

  getNamesText(): string {
    let text = "";
    for (let i = 0; i < this._travelers.length; i++) {
      text = text + this._travelers[i].name;
      if (i < this._travelers.length - 1) {
        text = text + ", ";
      }
    }
    return text;
  }
}
class Booking {
  private _bookingId: string;
  private _customer: Customer;
  private _package: TravelPackage;
  private _detail: BookingDetail;

  constructor(id: string, customer: Customer, pkg: TravelPackage) {
    this._bookingId = id;
    this._customer = customer;
    this._package = pkg;
    this._detail = new BookingDetail(); 
  }

  addTraveler(name: string, age: number): void {
    this._detail.addTraveler(name, age);
  }

  getTotalPrice(): number {
    return this._package.calculatePrice(this._detail.getCount());
  }

  printDetail(): void {
    console.log("===== Booking Detail =====");
    console.log("Booking ID: " + this._bookingId);
    console.log("Customer: " + this._customer.getName());
    console.log("Package: " + this._package.getPackageName());
    console.log(
      "Travelers: " + this._detail.getCount() + " (" + this._detail.getNamesText() + ")"
    );
    console.log("--------------------------------");
    console.log(
      "Total Price (" + this._package.getDiscountText() + "): " +
        this.getTotalPrice().toFixed(2) + " Baht"
    );
  }
}

class TravelAgency {
  private _name: string;
  private _packages: TravelPackage[] = [];

  constructor(name: string) {
    this._name = name;
  }

  addPackage(pkg: TravelPackage): void {
    this._packages.push(pkg);
  }

  printPackages(): void {
    console.log("===== Travel Packages =====");
    for (let i = 0; i < this._packages.length; i++) {
      const p = this._packages[i];
      console.log((i + 1) + ". " + p.getPackageName() + " (" + p.getTypeText() + ")");
      console.log("Price: " + p.getBasePrice().toFixed(2) + " Baht");
    }
    console.log("");
  }
}
const cityTour = new OneDayTrip("P001", "Bangkok City Tour", 1500);
const chiangMai = new OvernightTrip("P002", "Chiang Mai Trip", 2500, 3);
const agency = new TravelAgency("Sunset Travel");
agency.addPackage(cityTour);
agency.addPackage(chiangMai);
agency.printPackages();

const alice = new Customer("C001", "Alice", "0812345678");
const booking = new Booking("B001", alice, cityTour);
booking.addTraveler("Alice", 30);
booking.addTraveler("Bob", 28);
booking.addTraveler("Carol", 35);
booking.addTraveler("David", 32);
booking.addTraveler("Eve", 27);
booking.printDetail();

console.log("");
console.log("Polymorphic execution call:");
console.log("pkg.calculatePrice(5) -> " + cityTour.calculatePrice(5).toFixed(2) + " Baht (One-Day)");
console.log("pkg.calculatePrice(5) -> " + chiangMai.calculatePrice(5).toFixed(2) + " Baht (Overnight)");
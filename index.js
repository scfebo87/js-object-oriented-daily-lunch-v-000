let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0;
let customerId = 0; 
let mealId = 0;
let deliveryId = 0;

class Neighborhood { 
  constructor(name) { 
    this.id = ++neighborhoodId;
    this.name = name; 
    store.neighborhoods.push(this);
  }
  deliveries() { 
    return store.deliveries.filter(delivery => { 
      return delivery.neighborhoodId === this.id});
  }
  customers() { 
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id});
  }
  meals() { 
    let orderedMeals = this.deliveries().map(delivery => { 
      return delivery.meal()});
      return [...new Set(orderedMeals)];
  }
}
class Customer { 
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.name = name; 
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this); 
  }
  deliveries() {
     return store.deliveries.filter(delivery => {
       return delivery.customerId === this.id});
  }
  meals() { 
    return this.deliveries().map(delivery => {
      return delivery.meal()});
  }
  totalSpent() { 
    let total = 0; 
    this.meals().forEach(function(meal) {
      total += meal.price;
    });
    return total;
  }
}

class Meal { 
  constructor(title, price) {
     this.id = ++mealId;
    this.title = title;
    this.price = price; 
    store.meals.push(this); 
  }
  deliveries() { 
    return store.deliveries.filter(delivery => {
      return delivery.mealId == this.id});
  }
  customers() { 
    return this.deliveries().map(delivery => {
      delivery.customer()});
  }
  static byPrice() { 
    return store.meals.sort(function(a, b) {
      return b.price - a.price;
    });
  }
}

class Delivery { 
  constructor(customerId, neighborhoodId, mealId) { 
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    store.deliveries.push(this);
  }
  setNeighborhood(neighborhood) {
    this.neighborhoodId = neighborhood.id;
  }
  setCustomer(customer) {
   this.customerId = customer.id;
  }
  setMeal(meal) {
   this.mealId = meal.id;
  }
  meal() { 
    return store.meals.find(meal => {
      return this.mealId === meal.id});
  }
  customer() { 
    return store.customers.find(customer => {
      return customer.id  === this.customerId}); 
  }
  neighborhood() { 
    return store.neighborhoods.find(neighborhood => { return neighborhood.id === this.neighborhoodId});
  }
}
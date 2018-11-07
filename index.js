// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 1
let mealId = 1
let customerId = 1
let deliveryId = 1

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter((customer) => customer.neighborhoodId === this.id)
  }

  meals(){
    let allMeals = this.deliveries().map((delivery) => delivery.meal())
    return [...new Set(allMeals)]
  }


} // End of Neighborhood Class


class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.mealId === this.id)
  }

  customers(){
    const myList = this.deliveries().map(delivery => delivery.customer())
    return [...new Set(myList)];
  }

  static byPrice() {
    let allMeals = store.meals.slice()

    allMeals = allMeals.sort((a, b) => {
      return b.price - a.price
    })
    return allMeals
  }
} // End of Meal Class

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerId++
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter((delivery) => delivery.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(delivery => delivery.meal())
  }

  totalSpent(){
    return this.meals().reduce((total, meal) => total += meal.price, 0)
  }

} // End of Customer Class

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = deliveryId++
    store.deliveries.push(this)
  }

  meal(){
    return store.meals.find(meal => meal.id == this.mealId)
  }

  customer(){
    return store.customers.find(customer => customer.id == this.customerId)
  }

  neighborhood(){
    return store.neighborhoods.find(neighborhood => neighborhood.id == this.neighborhoodId)
  }
} // End of Delivery Class

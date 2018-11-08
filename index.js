// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodIdCounter = 1
let mealIdCounter = 1
let customerIdCounter = 1
let deliveryIdCounter = 1

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = neighborhoodIdCounter++
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId == this.id)
  }

  customers() {
    return store.customers.filter(person => person.neighborhoodId == this.id)
  }

  meals() {
    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index
    }

    return this.deliveries().map(delivery => delivery.mealId).filter(onlyUnique).map(mealId => store.meals.find(meal => meal.id == mealId))
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealIdCounter++
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId == this.id)
  }

  customers() {
    return this.deliveries().map(delivery => store.customers.find(customer => delivery.customerId == customer.id))
  }

  static byPrice() {
    let mealz = store.meals.slice()
    mealz = mealz.sort((meal1, meal2) => meal2.price - meal1.price)
    return mealz
  }
}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerIdCounter++
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId == this.id)
  }

  meals() {
    return this.deliveries().map(delivery =>  store.meals.find(meal => meal.id == delivery.mealId))
  }

  totalSpent() {
    let sum = 0
    this.meals().forEach(meal => sum += meal.price)
    return sum
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = deliveryIdCounter++
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id == this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id == this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id == this.neighborhoodId)
  }
}

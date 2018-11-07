let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
// global datastore
let neighborhoodCount,customerCount,mealCount,deliveryCount;
class Neighborhood{
  constructor(name){
    this.name = name;
    this.id = !neighborhoodCount ? neighborhoodCount = 1 : neighborhoodCount++;
    store.neighborhoods.push(this)
  }
  deliveries(){
    return store.deliveries.filter((delivery)=>delivery.neighborhoodId === this.id)
  }
  customers(){
    return store.customers.filter((customer)=>customer.neighborhoodId === this.id)
  }
  meals(){
    //console.log(this.deliveries()[0].meal());
    //console.log(.map((delivery)=>delivery.meal())
    // return
    return [...new Set(this.deliveries().map((delivery)=>{
      return delivery.meal()}))]
  }
}
class Customer{
  constructor(name,neighborhoodId){
    this.name = name;
    this.id = !customerCount ? customerCount = 1 : customerCount++;
    this.neighborhoodId = neighborhoodId;
    store.customers.push(this)
  }
  deliveries(){
    return store.deliveries.filter((delivery)=>delivery.customerId === this.id)
  }
  meals(){
    let mealIds = this.deliveries().map((delivery)=>delivery.mealId)
    return mealIds.map((mealId)=>store.meals.find((meal)=>meal.id ==mealId))
  }
  totalSpent(){
    return this.meals().map((meal)=>parseFloat(meal.price)).reduce((a,b)=>a+b)
  }
}
class Meal{
  constructor(title,price){
    this.title = title;
    this.price = price;
    this.id = !mealCount ? mealCount = 1 : mealCount++;
    store.meals.push(this);
  }
  deliveries(){
    return store.deliveries.filter((delivery)=>delivery.mealId === this.id)
  }
  customers(){
    let customerIds = this.deliveries().map((delivery)=>delivery.customerId)
    return customerIds.map((customerId)=>store.customers.find((customer)=>customer.id ==customerId))
  }
}
Meal.byPrice = function(){
  return store.meals.sort((b,a)=>parseFloat(a.price)-parseFloat(b.price))
}
class Delivery{
  constructor(mealId,neighborhoodId,customerId){
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    this.id = !deliveryCount ? deliveryCount = 1 : deliveryCount++;
    store.deliveries.push(this);
  }
  meal(){
    return store.meals.find((meal)=>meal.id===this.mealId)
  }
  customer(){
    return store.customers.find((customer)=>this.customerId===customer.id)
  }
  neighborhood(){
    return store.neighborhoods.find((neighbor)=>this.neighborhoodId===neighbor.id)
  }

}

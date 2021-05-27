function Firm(firm_id, market_price) {
 this.firm_id = firm_id;

 this.fc = 45.18; // fixed cost
 this.vc = 1.20; // variable cost
 this.a = 35; // technology
 
 if (market_price === null) {
  this.price = Math.floor((2.5 + Math.random())*100)/100;
 } else {
  this.price = Math.floor((market_price-0.05)*100)/100;
 } 
 
 // use price to get quantity
 this.x_optimal = (this.a*this.price) / this.vc; // profit maximizing amt of labor to hire
 this.q_optimal = this.a*Math.log(this.x_optimal); // y* = aln(x*)
 this.q_corrected = Math.floor(this.q_optimal); // corrected
 this.x_corrected = Math.pow(Math.E, (this.q_corrected / this.a));
 //console.log('profit : ' + (this.price*this.q_corrected-this.vc*this.x_corrected-this.fc));
 
 // labor needed        : x_corrected
 // expected production : q_corrected

 // if pq leads to loss, increase price by 0.01
 while ((this.price*this.q_corrected-this.vc*this.x_corrected-this.fc) < 0) {
   //console.log(this.price*this.q_corrected-this.vc*this.x_corrected-this.fc);
   this.price += 0.01;
   this.x_optimal = (this.a*this.price) / this.vc; // profit maximizing amt of labor to hire
   this.q_optimal = this.a*Math.log(this.x_optimal); // y* = aln(x*)
   this.q_corrected = Math.floor(this.q_optimal); // corrected
   this.x_corrected = Math.pow(Math.E, (this.q_corrected / this.a));
 }
 
 
 this.q_produced = 0;
 this.q_sold = 0;
 this.cost = 0;
 this.revenue = 0;
 this.profit = 0;
 
 this.accumulated_profit = 0;
 this.profits = [];
 this.age = 0;
 this.active = true;
 this.dead = false;
 
}
Firm.prototype.reset = function() {
 this.x = 0;
 this.q_optimal = 0;
 this.q_produced = 0;
 this.q_sold = 0;
 this.cost = 0;
 this.revenue = 0;
 this.profit = 0;
 
 if (this.accumulated_profit < 0) {
   this.dead = true;
 }
}

Firm.prototype.getOptimalQuantity = function() {
 this.x_optimal = (this.a*this.price) / this.vc; // profit maximizing amt of labor to hire
 this.q_optimal = this.a*Math.log(this.x_optimal); // y* = aln(x*)
 this.q_corrected = Math.floor(this.q_optimal); // corrected
 this.x_corrected = Math.pow(Math.E, (this.q_corrected / this.a));
}
Firm.prototype.produce = function(market_supply_id) {

 this.age++;
 this.q_produced = this.q_corrected;
 this.cost = this.fc + this.vc*this.x_corrected;
 this.profit = -this.cost;
 this.accumulated_profit += -this.cost;
 this.profits.push(this.profit);
 
 let output = [];
 for (let i = 0; i < this.q_produced; i++) {
   let a = new Apple(this.price, this.firm_id, i, market_supply_id+i);
   output.push(a);
 }
 return output;
}
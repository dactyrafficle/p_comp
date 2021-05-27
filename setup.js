
// ONE FULL COLLISION
function collide() {

 // STEP 1
 // RESET MARKET (RESET SALES DATA OF EXISTING FIRMS AND CONSUMERS, AND CLEARING THE MARKET)
 reset_market();

 // STEP 2
 // ADD FIRMS AND CONSUMERS
 if (year === 0) {
  addFirms(n_firms);
  addConsumers(n_consumers);
 } else {
  addFirms();
  //addConsumers(1);
 }
 
 // STEP 3
 // FIRMS PRODUCE
 produce(firms);
 
 // STEP 4
 // CONSUMERS PURCHASE
 purchase(apples);
 
 // STEP 5
 // CULL FIRMS
 cullFirms(firms);
 
 // STEP 6
 // UPDATE INFOBOXES
 update_and_display_firm_info(firms);
 //update_and_display_market_supply(apples);
 displayApples2(apples);
 
 // REVIEW THE COLLISION AND INCREMENT THE YEAR
 reviewCollision(firms, consumers, apples); // year and market_price are global variables

}

// ADD FIRMS
function addFirms(n_firms) {
 if (arguments[0]) {
  for (let i = 0; i < n_firms; i++) {
   firms.push(new Firm(firms.length, market_price));
  }
 } else {
  firms.push(new Firm(firms.length, market_price));
 }
}

// ADD CONSUMERS
function addConsumers(n_consumers) {
 for (let i = 0; i < n_consumers; i++) {
  consumers.push(new Consumer(consumers.length));
 }
}

function resetMarketSupply() {
 // RESET MARKET SUPPLY
 apples = [];
 document.getElementById('apples').innerHTML = '';
}

// FIRMS PRODUCE APPLES
function produce(firms) {
 for (let i = 0; i < firms.length; i++) {
  if (firms[i].active) {
   firms[i].getOptimalQuantity();
   apples = apples.concat(firms[i].produce(apples.length));
  }
 }
}

// CONSUMERS PURCHASE APPLES
function purchase(apples) {
 for (let i = 0; i < consumers.length; i++) {
  consumers[i].purchase(apples);
 }
}

// FIRMS THAT HAVE LOST MONEY DIE
function cullFirms(firms) {
 for (let j = 0; j < firms.length; j++) {
  if (firms[j].accumulated_profit < 0) {
   firms[j].active = false;
  }
 }
}

function reset_market() {
 
 // RESET FIRMS
 for (let i = 0; i < firms.length; i++) {
  firms[i].reset();
 }
 // RESET CONSUMERS
 for (let i = 0; i < consumers.length; i++) {
  consumers[i].reset();
 }
 // RESET MARKET SUPPLY
 apples = [];

}

function reviewCollision(firms, consumers, apples) {
 // GET MARKET PRICE
 let market_revenue = 0;
 let market_demand = 0;
 let market_supply = 0;
 let sales_data = [];
 for (let j = 0; j < firms.length; j++) {
  market_revenue += firms[j].revenue;
  market_demand += firms[j].q_sold;
  market_supply += firms[j].q_produced;
 }
 for (let j = 0; j < firms.length; j++) {
  sales_data.push({
   'price':firms[j].price,
   'q_sold':firms[j].q_sold,
   'q_produced':firms[j].q_produced,
   'revenue':firms[j].revenue,
   'market_share_by_units':firms[j].q_sold / market_demand,
   'market_share_by_revenue':firms[j].revenue / market_revenue
  });
 }
 market_price = Math.floor(market_revenue / market_demand *100)/100;
 console.log(year + ' : ' + market_price);
 
 data.push({
   'year':year,
   'market_supply':market_supply,
   'market_revenue':market_revenue,
   'market_demand':market_demand,
   'market_share':market_demand,
   'market_price':market_price,
   'sales_data':sales_data
 })
 
 
 year++;
}
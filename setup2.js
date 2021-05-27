/*
// INITIALIZE
document.getElementById('initialize').addEventListener('click', function() {
 createFirms(n_firms);
 createConsumers(n_consumers);
 resetMarketSupply();
 update_and_display_firm_info(firms);
});

// FIRMS ENTER THE MARKET
document.getElementById('firms_enter_market').addEventListener('click', function() {
 firms.push(new Firm(firms.length));
 update_and_display_firm_info(firms);
});

// FIRMS PRODUCE APPLES
document.getElementById('produce_apples').addEventListener('click', function() {
 produce(firms);
 update_and_display_firm_info(firms);
 update_and_display_market_supply(apples);
});

// CONSUMERS PURCHASE APPLES
document.getElementById('purchase_apples').addEventListener('click', function() {
 purchase(apples);
 update_and_display_firm_info(firms);
 update_and_display_market_supply(apples);
});

// CULL FIRMS
document.getElementById('cull_firms').addEventListener('click', function() {
 cullFirms(firms);
 update_and_display_firm_info(firms);
});

// ANALYZE THE YEAR
document.getElementById('finalize_year').addEventListener('click', function() {
 reviewCollision(firms, consumers, apples);
 update_and_display_firm_info(firms);
 update_and_display_market_supply(apples);
});


// RESET FIRMS, CONSUMERS, MARKET 
document.getElementById('reset_market').addEventListener('click', function() {
 reset_market();
 update_and_display_firm_info(firms);
 update_and_display_market_supply(apples);
});

*/
function Consumer(consumer_id) {
 this.consumer_id = 'CMR' + 2000+consumer_id+1;
 this.alpha = 0.5;
 this.beta = 0.5;
 this.M = 100;
 this.purchases = [];
 this.expenditure = 0;
 this.q_purchased = 0;
}
Consumer.prototype.reset = function() {
 this.purchases = [];
 this.expenditure = 0;
 this.q_purchased = 0;
};
Consumer.prototype.purchase = function(apples) {

  if (apples.length === 0) {
   return null;
  }

 // x* = \alpha*M / p (means)=> px < \alpha *M

 // check if purchasing the next unit causes you to exceed your budget allowance
 // we are always considering purchasing arr[0], since it is first in the list

 
 // SORT BACKWARDS
 apples.sort(function(a,b) {
  return  a.price - b.price;
 });
 //console.log(arr);
 
 for (let i = 0; i < apples.length; i++) {
   
   if (!apples[i].sold && (this.expenditure + apples[i].price) < (this.alpha*this.M)) {
     // apple is unsold and prospective expenditure is less than budget allowance  
     
     let apple = apples[i];
     apple.sold = true;
     apple.consumer_id = this.consumer_id;
     

     let price = apple.price;
     
     this.expenditure += price;
     this.q_purchased += 1;
      
     // ypdate the firm which produced the apple
     for (let y = 0; y < firms.length; y++) {
       if (firms[y].firm_id === apple.firm_id) {
         firms[y].q_sold++;
         firms[y].revenue += price;
         firms[y].profit += price;
         firms[y].accumulated_profit += price;
         firms[y].profits[firms[y].profits.length-1] = firms[y].profit;
       } 
     }
   }
 }

}
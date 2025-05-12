export const calculateProfite=(order)=>{

    console.log("order --------- ",order.orderItem.sellPrice,
    order.orderItem?.buyPrice,order.orderItem.buyPrice)
// return "-"
    if(order && order.orderItem && order.orderItem.buyPrice && order.orderItem.sellPrice){
         return order.orderItem.sellPrice-order.orderItem.buyPrice;
    }
    return "-"

   

}
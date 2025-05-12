export const existInWatchlist=(items,coin)=>{

    for(let item of items){
        if(item?.id===coin?.id)return true;
    }
    return false;

}
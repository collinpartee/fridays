export default class Stonk {
     ticker: string;
     price: string;
   
     constructor(request: any) {
       this.ticker = request.ticker;
       this.price = '$'+request.c;
     }
   }
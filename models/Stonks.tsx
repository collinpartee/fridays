interface News {
    url: string;
    source: string;
    date: string;   
   }
   export default class Stonk {
     name: string;
     ticker: string;
     price: string;
     percentChange: string;
     logoURL: string;
     tradeScore: string;
     tradeWords: string;
     tradeRate: number;
     newsArticle: News;
   
     constructor(request: any) {
       var data = request.data;
       // console.log(data)
       this.name = data.shortName;
       this.ticker = data.ticker;
       this.price = data.currentPrice;
       this.percentChange = data.percentText;
       this.logoURL = data.logoURL;
       this.tradeWords = data.tradeWords;
       this.tradeScore = data.tradeScore;
       this.tradeRate = data.tradeRate;
       this.newsArticle = {
         date: data.newsDate5,
         source: data.newsSource5,
       url: data.newsLink5
       };
     }
   }
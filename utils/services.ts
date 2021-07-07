import axios from 'redaxios';
import { unsplash } from '../config/unsplash';
import { toJson } from 'unsplash-js';
import Stonk from '../models/Stonks';
import Unsplash from '../models/Unsplash';
import { Subreddits } from '../models/SubData';

interface BlackHistoryFact {
  text: string
}


async function GetCryptos(cryptoSymbol: string): Promise<string> {
    //check if this can be an array of stuff
    var result = '';
    var crypto =  await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoSymbol}&tsyms=USD`);
    return result
};

async function GetStonks(tickers: string[]): Promise<Stonk[]> {
  var result =[];
  for (let index = 0; index < tickers.length; index++) {
    const element = tickers[index];
    var stockData = await axios.get(`https://www.styvio.com/api/${element}`);

    var stock = new Stonk(stockData);
    result.push(stock);
    
  }
  // console.log(result)
  return result;

};

async function GetRandomBlackHistoryFact(): Promise<BlackHistoryFact> {
    var uri = process.env.NEXT_PUBLIC_BLACK_HISTORY_URI.toString();
    var apiKey = process.env.NEXT_PUBLIC_BLACK_HISTORY_API_KEY.toString();
    let config = {
        headers: {
          "x-api-key": apiKey,
        }
      }
    var response = await axios.get(uri, config);
    var randomFact = response.data.Results[0];
    return randomFact;
};

async function GetImage(photoTopic: string): Promise<Unsplash> {
    try {
        var randomPic = await unsplash.photos.getRandomPhoto({query: photoTopic});
        var result = await toJson(randomPic)

        return new Unsplash(result);
    } catch (error) {
      console.log(error);
    }
};

async function GetRedditFeed(subredditName: string): Promise<Subreddits>{
  var data = await axios.get(`https://www.reddit.com/r/${subredditName}.json?`);
  return new Subreddits(data);
};

function GetCountdown(day: string = 'friday'): number {
  var daysTill = 0;
  if(day =='friday') {
    const FRIDAY = 5,
    TODAY = new Date();

  daysTill =  FRIDAY - TODAY.getDay() > -1 ?
    FRIDAY - TODAY.getDay() :
    TODAY.getDay();
  }
  
  return daysTill;
};

const services = {
    getCryptos: GetCryptos,
    getFact: GetRandomBlackHistoryFact,
    getImage: GetImage,
    getRedditFeed: GetRedditFeed,
    getCountdown: GetCountdown,
    getStonks: GetStonks
}

export default services;